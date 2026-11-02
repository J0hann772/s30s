# Запуск s30s в Docker

Сайт статический, поэтому в контейнере только nginx с файлами сайта.
Конфиги те же, что на боевом сервере: `server/nginx-security.conf`
и `server/nginx-http.conf` подключаются внутри образа.

## Что где лежит

| Файл | Зачем |
|---|---|
| `Dockerfile` | образ: nginx + файлы сайта + конфиги |
| `.dockerignore` | что не класть в образ (`.git`, `notes/`, `tools/`, скрипты деплоя) |
| `docker-compose.yml` | обычный запуск: файлы запекаются в образ |
| `docker-compose.dev.yml` | для правок: файлы берутся с диска |
| `server/nginx-docker.conf` | блок `server` для контейнера |

## Обычный запуск

```bash
docker compose up -d --build
```

Сайт: http://localhost:8080

Остановить: `docker compose down`
После правок: снова `docker compose up -d --build`.

## Режим правок

Файлы читаются прямо с диска, пересобирать образ не нужно: поправил, обновил страницу.

```bash
docker compose -f docker-compose.dev.yml up -d
```

Сайт: http://localhost:8080
Остановить: `docker compose -f docker-compose.dev.yml down`

Конфиги nginx тоже подключены с диска, но после их правки контейнер нужно перезапустить:

```bash
docker compose -f docker-compose.dev.yml restart
```

## Полезное

Логи: `docker compose logs -f`
Проверить конфиг nginx внутри: `docker compose exec site nginx -t`
Состояние (есть healthcheck): `docker ps`

## Данные конспектов

Docker не пересобирает `data/*.js` из `notes/`. После правки конспектов
сначала собери данные, потом пересобирай образ:

```bash
python tools/build_data.py notes/matan-rk1 notes/matan-rk1/93_block_b_figs.json data/matan-rk1.js
docker compose up -d --build
```

## На боевом сервере

Сейчас `s30s.ru` отдаётся системным nginx из `/var/www/cheatsheet` — это
работает и Docker там не нужен. Если когда-нибудь переводить сервер на Docker,
порт 80 уже занят системным nginx, поэтому варианта два: либо отключить его
(`systemctl disable --now nginx`) и пробрасывать `80:80` и `443:443`, причём
сертификаты Let's Encrypt придётся монтировать в контейнер, либо оставить
системный nginx как обратный прокси на `127.0.0.1:8080`. Второй вариант проще:
HTTPS остаётся снаружи и трогать certbot не нужно.
