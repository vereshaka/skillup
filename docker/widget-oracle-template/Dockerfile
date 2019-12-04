FROM tasktrack.telekom.at/gucci-docker-local/additional-libraries:0.1.0 as libs

RUN apk add unzip && \
    mkdir /opt/oracle && \
    unzip '/tmp/oracle-files/instantclient-*.zip' -d /opt/oracle


FROM tasktrack.telekom.at/gucci-docker-local/widget-template:latest

RUN mkdir -p /usr/share/man/man1 && \
    mkdir -p /opt/oracle/instantclient

RUN export DEBIAN_FRONTEND=noninteractive && \
    apt-get update && \
    apt-get install -y libaio1 default-jre --no-install-recommends && \
    apt-get clean autoclean && \
    apt-get autoremove --yes && \
    rm -rf /var/lib/{apt,dpkg,cache,log}/
    
COPY --from=libs /opt/oracle/instantclient_12_2 /opt/oracle/instantclient

RUN ln -s /opt/oracle/instantclient/libclntsh.so.12.1 /opt/oracle/instantclient/libclntsh.so && \
    ln -s /opt/oracle/instantclient/libocci.so.12.1 /opt/oracle/instantclient/libocci.so

ENV LD_LIBRARY_PATH="/opt/oracle/instantclient" \
    OCI_HOME="/opt/oracle/instantclient" \
    OCI_LIB_DIR="/opt/oracle/instantclient" \
    OCI_INCLUDE_DIR="/opt/oracle/instantclient/sdk/include" \
    OCI_VERSION=12 \
    JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java"

RUN echo '/opt/oracle/instantclient/' | tee -a /etc/ld.so.conf.d/oracle_instant_client.conf && ldconfig