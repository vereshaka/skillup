FROM node:8-slim

LABEL "maintainer"="viacheslav.nezamai@sytoss.com"

ARG LOGGING_LOGSTASH_HOST
ARG LOG_FOLDER
ENV LOGGING_LOGSTASH_HOST=$LOGGING_LOGSTASH_HOST
ENV LOG_FOLDER=$LOG_FOLDER
ENV ELK_VER=6.8.0

RUN apt-get update && \
    apt-get install -y supervisor --no-install-recommends && \
    curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-$ELK_VER-amd64.deb && \
    dpkg -i filebeat-$ELK_VER-amd64.deb && \
    rm filebeat-$ELK_VER-amd64.deb && \
    apt-get clean autoclean && \
    apt-get autoremove --yes && \
    rm -rf /var/lib/{apt,dpkg,cache,log}/ && \
    rm -rf /var/log/*

RUN echo '[supervisord]' > /etc/supervisor/conf.d/supervisord.conf && \
    echo 'user=root' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'nodaemon=true' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'environment=LOGGING_LOGSTASH_HOST="%(ENV_LOGGING_LOGSTASH_HOST)s",LOG_FOLDER="%(ENV_LOG_FOLDER)s"\n' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo '[program:filebeat-app]' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'command=/usr/bin/filebeat -e' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo "autostart=true" >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'startsecs=5' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'autorestart=true' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'startretries=5' >> /etc/supervisor/conf.d/supervisord.conf

RUN echo "# Last update of this config file was 17.09.19" > /etc/filebeat/filebeat.yml && \
    echo "output.logstash:" >> /etc/filebeat/filebeat.yml && \
    echo "  hosts: \${LOGGING_LOGSTASH_HOST}:\${LOGGING_LOGSTASH_PORT:5044}" >> /etc/filebeat/filebeat.yml && \
    echo "filebeat.inputs:" >> /etc/filebeat/filebeat.yml && \
    echo "- type: log" >> /etc/filebeat/filebeat.yml && \
    echo "  paths: \${LOG_FOLDER}" >> /etc/filebeat/filebeat.yml && \
    echo "  fields_under_root: true"  >> /etc/filebeat/filebeat.yml && \
    echo "  fields:" >> /etc/filebeat/filebeat.yml && \
    echo "    widget: \${WIDGET_NAME:unknown}" >> /etc/filebeat/filebeat.yml && \
    echo "    environment: \${NODE_ENV:not_specified}" >> /etc/filebeat/filebeat.yml && \
    echo "  multiline.pattern: '^\[\d'" >> /etc/filebeat/filebeat.yml && \
    echo '  multiline.negate: true' >> /etc/filebeat/filebeat.yml && \
    echo '  multiline.match: after' >> /etc/filebeat/filebeat.yml && \
    chmod 0644 /etc/filebeat/filebeat.yml


CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]