#!/bin/bash

VERSION=$1
REPO="loc"
PROJECT="widget-oracle-template"
# tasktrack.telekom.at/gucci-docker-local
./build_docker.sh $PROJECT $VERSION $REPO

exit 0