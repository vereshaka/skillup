#!/bin/bash

VERSION=$1
REPO="tasktrack.telekom.at/gucci-docker-local"
PROJECT="widget-oracle-template"

./build_docker.sh $PROJECT $VERSION $REPO

exit 0