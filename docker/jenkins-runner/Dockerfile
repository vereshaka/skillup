FROM tasktrack.telekom.at/gucci-docker-local/additional-libraries:0.1.0 as libs

RUN apk add unzip && \
    mkdir /opt/oracle && \
    unzip '/tmp/oracle-files/instantclient-*.zip' -d /opt/oracle


FROM jenkins/jnlp-slave:latest-jdk11
USER root
COPY --from=libs /opt/oracle/instantclient_12_2 /opt/oracle/instantclient

RUN ln -s /opt/oracle/instantclient/libclntsh.so.12.2 /opt/oracle/instantclient/libclntsh.so && \
    ln -s /opt/oracle/instantclient/libocci.so.12.2 /opt/oracle/instantclient/libocci.so
RUN mkdir /root/.cache && \
    chmod -R 777 /root/.cache && \
    apt-get update && \
    apt-get install -y libgconf-2-4 libgtk-3-0 xvfb chromium git --no-install-recommends && \
    apt-get clean autoclean && \
    apt-get autoremove --yes && \
    rm -rf /var/lib/{apt,dpkg,cache,log}/

ENV LD_LIBRARY_PATH="/opt/oracle/instantclient" \
    OCI_HOME="/opt/oracle/instantclient" \
    OCI_LIB_DIR="/opt/oracle/instantclient" \
    OCI_INCLUDE_DIR="/opt/oracle/instantclient/sdk/include" \
    OCI_VERSION=12

RUN echo '/opt/oracle/instantclient/' | tee -a /etc/ld.so.conf.d/oracle_instant_client.conf && ldconfig
