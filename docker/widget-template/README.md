# Widget template

## Environment variables

### Mandatory variables

* LOGGING_LOGSTASH_IP - IP or FQDN of Logstash target host.

* LOG_FOLDER - absolute paths to folders that contains logs.

### Additional variables

* LOGGING_LOGSTASH_PORT - port that Logstash target host listen. Default value is 5044.

* ELK_VER - version of Elastic Stack. This value used for equality Filebeat and Elastic Stack versions. Default value is '6.8.3'.

* WIDGET_NAME - name of widget. Default value is 'unknown'.
  
* NODE_ENV - environment name. Default value is 'not_specified'
