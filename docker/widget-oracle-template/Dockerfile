FROM tasktrack.telekom.at/gucci-docker-local/widget-additional-libraries:0.1.0 as libs

RUN apk add unzip wget tar && \
    mkdir /opt/oracle && \
    unzip '/tmp/oracle-files/instantclient-*.zip' -d /opt/oracle
RUN wget https://github.com/AdoptOpenJDK/openjdk8-binaries/releases/download/jdk8u275-b01/OpenJDK8U-jre_x64_linux_hotspot_8u275b01.tar.gz && \
    mkdir /opt/openjdk && \
    tar -xvzf OpenJDK8U-jre_x64_linux_hotspot_8u275b01.tar.gz -C /opt/openjdk


FROM tasktrack.telekom.at/gucci-docker-local/widget-template:latest

RUN export DEBIAN_FRONTEND=noninteractive && \
    mkdir -p /usr/share/man/man1 && \
    apt-get update && \
    apt-get install -y libaio1 --no-install-recommends && \
    apt-get clean autoclean && \
    apt-get autoremove --yes && \
    rm -rf /var/lib/{apt,dpkg,cache,log} /var/log
    
COPY --from=libs /opt/oracle/instantclient_12_2 /opt/oracle/instantclient
COPY --from=libs /opt/openjdk/jdk8u275-b01-jre /usr/lib/jvm/java-8-openjdk-amd64

RUN ln -s /opt/oracle/instantclient/libclntsh.so.12.1 /opt/oracle/instantclient/libclntsh.so && \
    ln -s /opt/oracle/instantclient/libocci.so.12.1 /opt/oracle/instantclient/libocci.so && \
    ln -s /usr/lib/jvm/java-8-openjdk-amd64/bin/java /usr/bin/java

ENV LD_LIBRARY_PATH="/opt/oracle/instantclient" \
    OCI_HOME="/opt/oracle/instantclient" \
    OCI_LIB_DIR="/opt/oracle/instantclient" \
    OCI_INCLUDE_DIR="/opt/oracle/instantclient/sdk/include" \
    OCI_VERSION=12 \
    JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64/bin/java"
RUN echo '/opt/oracle/instantclient/' | tee -a /etc/ld.so.conf.d/oracle_instant_client.conf && ldconfig