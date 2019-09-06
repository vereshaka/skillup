FROM alpine:latest as unpacker
COPY ./oracle/ /tmp/oracle-files

RUN apk add unzip && mkdir /opt/oracle && \
    unzip '/tmp/oracle-files/instantclient-*.zip' -d /opt/oracle



FROM tasktrack.telekom.at/gucci-docker-local/widget-template:latest

RUN mkdir -p /usr/share/man/man1 && \
    mkdir -p /opt/oracle/instantclient

RUN export DEBIAN_FRONTEND=noninteractive && \
    apt update && \
    apt install -y libaio1 build-essential default-jre --no-install-recommends && \
    apt clean autoclean && \
    apt autoremove --yes && \
    rm -rf /var/lib/{apt,dpkg,cache,log}/ && \
    rm -rf /var/log/*
    
COPY --from=unpacker /opt/oracle/instantclient_12_2 /opt/oracle/instantclient

RUN ln -s /opt/oracle/instantclient/libclntsh.so.12.2 /opt/oracle/instantclient/libclntsh.so && \
    ln -s /opt/oracle/instantclient/libocci.so.12.2 /opt/oracle/instantclient/libocci.so

ENV LD_LIBRARY_PATH="/opt/oracle/instantclient"
ENV OCI_HOME="/opt/oracle/instantclient"
ENV OCI_LIB_DIR="/opt/oracle/instantclient"
ENV OCI_INCLUDE_DIR="/opt/oracle/instantclient/sdk/include"
ENV OCI_VERSION=12
ENV JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java"

RUN echo '/opt/oracle/instantclient/' | tee -a /etc/ld.so.conf.d/oracle_instant_client.conf && ldconfig