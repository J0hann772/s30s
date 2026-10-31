#!/usr/bin/env bash
# Деплой s30s: пересобрать данные -> (коммит) -> git push -> git pull на сервере -> проверка сайта.
# Запуск:  ./deploy.sh              (дерево должно быть чистым или без изменений)
#          ./deploy.sh -m "текст"   (закоммитить все изменения этим сообщением и задеплоить)
#          ./deploy.sh --dry-run    (только показать команды, ничего не выполнять)
#          ./deploy.sh --no-build   (не пересобирать data/*.js)
# Настройки: deploy.conf рядом со скриптом (см. deploy.conf.example).
set -euo pipefail
cd "$(dirname "$0")"

# ---- что собирать: по строке на контрольную (добавляйте новые сюда) ----
BUILD_CMDS=(
  "tools/build_data.py notes/matan-rk1 notes/matan-rk1/93_block_b_figs.json data/matan-rk1.js"
  "tools/build_materials.py matan-rk1"
)

# ---- настройки (значения по умолчанию, перекрываются deploy.conf) ----
DEPLOY_HOST="s30s.ru"
DEPLOY_USER=""
DEPLOY_PATH="/var/www/cheatsheet"
DEPLOY_BRANCH="main"
DEPLOY_URL="https://s30s.ru"
[ -f deploy.conf ] && . ./deploy.conf
# deploy.conf, сохранённый в Windows (CRLF), оставляет \r в значениях: срезаем
for _v in DEPLOY_HOST DEPLOY_USER DEPLOY_PATH DEPLOY_BRANCH DEPLOY_URL; do printf -v "$_v" '%s' "${!_v//$'\r'/}"; done
# скрипт предназначен для запуска на вашем компьютере, а не на сервере
if [ -d /var/www ] && [ "$(pwd)" = "$DEPLOY_PATH" ]; then echo "Это сервер ($DEPLOY_PATH). Запускайте deploy.sh на своём компьютере; на сервере достаточно: git pull --ff-only" >&2; exit 1; fi

MSG=""; DRY=0; BUILD=1
while [ $# -gt 0 ]; do
  case "$1" in
    -m|--message) MSG="${2:-}"; shift 2 ;;
    --dry-run) DRY=1; shift ;;
    --no-build) BUILD=0; shift ;;
    -h|--help) sed -n '2,8p' "$0"; exit 0 ;;
    *) echo "Неизвестный параметр: $1" >&2; exit 2 ;;
  esac
done

say() { printf '\n== %s\n' "$*"; }
run() { if [ "$DRY" = 1 ]; then printf '[dry-run] %s\n' "$*"; else "$@"; fi; }
TARGET="$DEPLOY_HOST"; [ -n "$DEPLOY_USER" ] && TARGET="$DEPLOY_USER@$DEPLOY_HOST"

# python: .venv проекта, иначе системный
PY=""
for c in .venv/Scripts/python.exe .venv/bin/python python3 python; do
  if [ -x "$c" ] || command -v "$c" >/dev/null 2>&1; then PY="$c"; break; fi
done

if [ "$BUILD" = 1 ]; then
  say "1. Сборка данных"
  [ -n "$PY" ] || { echo "Python не найден" >&2; exit 1; }
  for cmd in "${BUILD_CMDS[@]}"; do
    # shellcheck disable=SC2086
    run "$PY" $cmd
  done
else
  say "1. Сборка данных пропущена (--no-build)"
fi

say "2. Git"
BR="$(git rev-parse --abbrev-ref HEAD)"
[ "$BR" = "$DEPLOY_BRANCH" ] || { echo "Текущая ветка '$BR', ожидается '$DEPLOY_BRANCH'" >&2; exit 1; }
if [ -n "$(git status --porcelain)" ]; then
  if [ -z "$MSG" ]; then
    echo "Есть незакоммиченные изменения. Закоммитьте сами или запустите: ./deploy.sh -m \"текст коммита\"" >&2
    git status --short >&2
    [ "$DRY" = 1 ] || exit 1
  else
    run git add -A
    run git commit -m "$MSG"
  fi
else
  echo "Дерево чистое."
fi
run git push origin "$DEPLOY_BRANCH"

say "3. Сервер $TARGET:$DEPLOY_PATH"
run ssh "$TARGET" "cd '$DEPLOY_PATH' && git pull --ff-only origin '$DEPLOY_BRANCH' && git rev-parse --short HEAD"
echo "Локальный коммит: $(git rev-parse --short HEAD)"

say "4. Проверка $DEPLOY_URL"
if [ "$DRY" = 1 ]; then
  echo "[dry-run] curl $DEPLOY_URL/index.html"
else
  code="$(curl -sS -o /dev/null -w '%{http_code}' "$DEPLOY_URL/index.html" || true)"
  echo "HTTP $code"
  [ "$code" = 200 ] || { echo "Сайт отвечает не 200" >&2; exit 1; }
fi
say "5. Безопасность: служебные файлы не должны отдаваться"
if [ "$DRY" = 1 ]; then
  echo "[dry-run] curl $DEPLOY_URL/.git/HEAD, /tools/..., /notes/..., /deploy.sh (ожидается 404/403)"
else
  bad=0
  for path in .git/HEAD .git/config tools/build_data.py notes/matan-rk1/00_reference.md deploy.sh deploy.conf; do
    c="$(curl -sS -o /dev/null -w '%{http_code}' "$DEPLOY_URL/$path" || true)"
    if [ "$c" = 200 ]; then echo "ОПАСНО: $DEPLOY_URL/$path доступен публично (HTTP 200)" >&2; bad=1; else echo "ok  /$path -> $c"; fi
  done
  hdr="$(curl -sSI "$DEPLOY_URL/index.html" || true)"
  for h in content-security-policy x-content-type-options strict-transport-security; do
    echo "$hdr" | grep -qi "^$h:" && echo "ok  заголовок $h" || echo "предупреждение: нет заголовка $h (подключите server/nginx-security.conf)" >&2
  done
  [ "$bad" = 0 ] || { echo "Подключите server/nginx-security.conf в nginx и перезагрузите его." >&2; exit 1; }
fi
say "Готово"
