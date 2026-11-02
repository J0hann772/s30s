# Статический сайт s30s на nginx. Образ самодостаточный: внутри лежат
# и файлы сайта, и конфиги из server/.
FROM nginx:1.27-alpine

# Конфиги nginx: лимиты (контекст http) и блок server с правилами безопасности
COPY server/ /etc/nginx/s30s/
COPY server/nginx-http.conf   /etc/nginx/conf.d/00-limits.conf
COPY server/nginx-docker.conf /etc/nginx/conf.d/default.conf

# Файлы сайта (что не нужно — отсечено в .dockerignore)
COPY . /usr/share/nginx/html/

# Служебное внутрь образа не кладём, даже если .dockerignore обойдут
RUN rm -rf /usr/share/nginx/html/server \
           /usr/share/nginx/html/Dockerfile \
           /usr/share/nginx/html/.dockerignore \
           /usr/share/nginx/html/docker-compose*.yml \
 && nginx -t

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO /dev/null http://127.0.0.1/index.html || exit 1
