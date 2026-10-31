# Деплой s30s (Windows): пересобрать данные -> (коммит) -> git push -> git pull на сервере -> проверка сайта.
# Запуск:  .\deploy.cmd                      (дерево должно быть чистым)
#          .\deploy.cmd -m "текст"           (закоммитить все изменения этим сообщением и задеплоить)
#          .\deploy.cmd -DryRun              (только показать команды)
#          .\deploy.cmd -NoBuild             (не пересобирать data\*.js)
# Настройки: deploy.conf рядом со скриптом (см. deploy.conf.example).
param(
  [Alias("m")][string]$Message = "",
  [switch]$DryRun,
  [switch]$NoBuild
)
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# что собирать: по строке на контрольную (добавляйте новые сюда)
$BuildCmds = @(
  @("tools/build_data.py", "notes/matan-rk1", "notes/matan-rk1/93_block_b_figs.json", "data/matan-rk1.js")
)

$conf = @{ DEPLOY_HOST = "s30s.ru"; DEPLOY_USER = ""; DEPLOY_PATH = "/var/www/cheatsheet"; DEPLOY_BRANCH = "main"; DEPLOY_URL = "https://s30s.ru" }
if (Test-Path deploy.conf) {
  foreach ($line in Get-Content deploy.conf) {
    if ($line -match '^\s*([A-Z_]+)\s*=\s*"?([^"#]*)"?\s*(#.*)?$') { $conf[$Matches[1]] = $Matches[2].Trim() }
  }
}
$target = $conf.DEPLOY_HOST
if ($conf.DEPLOY_USER) { $target = "$($conf.DEPLOY_USER)@$($conf.DEPLOY_HOST)" }

function Say($t) { Write-Host ""; Write-Host "== $t" }
function Run([string]$exe, [string[]]$args_) {
  if ($DryRun) { Write-Host "[dry-run] $exe $($args_ -join ' ')"; return }
  & $exe @args_
  if ($LASTEXITCODE -ne 0) { throw "Команда завершилась с ошибкой ($LASTEXITCODE): $exe $($args_ -join ' ')" }
}

$py = $null
foreach ($c in @(".venv\Scripts\python.exe", "python", "python3")) {
  if ((Test-Path $c) -or (Get-Command $c -ErrorAction SilentlyContinue)) { $py = $c; break }
}

if (-not $NoBuild) {
  Say "1. Сборка данных"
  if (-not $py) { throw "Python не найден" }
  foreach ($cmd in $BuildCmds) { Run $py $cmd }
} else { Say "1. Сборка данных пропущена (-NoBuild)" }

Say "2. Git"
$br = (git rev-parse --abbrev-ref HEAD).Trim()
if ($br -ne $conf.DEPLOY_BRANCH) { throw "Текущая ветка '$br', ожидается '$($conf.DEPLOY_BRANCH)'" }
$dirty = git status --porcelain
if ($dirty) {
  if (-not $Message) {
    Write-Host "Есть незакоммиченные изменения. Закоммитьте сами или запустите: .\deploy.cmd -m `"текст коммита`""
    git status --short
    if (-not $DryRun) { exit 1 }
  } else {
    Run git @("add", "-A")
    Run git @("commit", "-m", $Message)
  }
} else { Write-Host "Дерево чистое." }
Run git @("push", "origin", $conf.DEPLOY_BRANCH)

Say "3. Сервер ${target}:$($conf.DEPLOY_PATH)"
$remote = "cd '$($conf.DEPLOY_PATH)' && git pull --ff-only origin '$($conf.DEPLOY_BRANCH)' && git rev-parse --short HEAD"
Run ssh @($target, $remote)
Write-Host "Локальный коммит: $((git rev-parse --short HEAD).Trim())"

Say "4. Проверка $($conf.DEPLOY_URL)"
if ($DryRun) { Write-Host "[dry-run] GET $($conf.DEPLOY_URL)/index.html" }
else {
  $code = (Invoke-WebRequest -UseBasicParsing -Uri "$($conf.DEPLOY_URL)/index.html").StatusCode
  Write-Host "HTTP $code"
  if ($code -ne 200) { throw "Сайт отвечает не 200" }
}
Say "5. Безопасность: служебные файлы не должны отдаваться"
if ($DryRun) { Write-Host "[dry-run] GET .git/HEAD, tools/..., notes/..., deploy.sh (ожидается 404/403)" }
else {
  $bad = $false
  foreach ($path in @(".git/HEAD", ".git/config", "tools/build_data.py", "notes/matan-rk1/00_reference.md", "deploy.sh", "deploy.conf")) {
    try { $c = (Invoke-WebRequest -UseBasicParsing -Uri "$($conf.DEPLOY_URL)/$path").StatusCode } catch { $c = [int]$_.Exception.Response.StatusCode }
    if ($c -eq 200) { Write-Host "ОПАСНО: $($conf.DEPLOY_URL)/$path доступен публично (HTTP 200)"; $bad = $true } else { Write-Host "ok  /$path -> $c" }
  }
  $hdr = (Invoke-WebRequest -UseBasicParsing -Uri "$($conf.DEPLOY_URL)/index.html").Headers
  foreach ($h in @("Content-Security-Policy", "X-Content-Type-Options", "Strict-Transport-Security")) {
    if ($hdr[$h]) { Write-Host "ok  заголовок $h" } else { Write-Host "предупреждение: нет заголовка $h (подключите server/nginx-security.conf)" }
  }
  if ($bad) { throw "Подключите server/nginx-security.conf в nginx и перезагрузите его." }
}
Say "Готово"
