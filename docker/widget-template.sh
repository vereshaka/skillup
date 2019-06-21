#!/bin/bash

VERSION=$1
REPO="tasktrack.telekom.at/gucci-docker-local"
PROJECT="widget-template"

./build_docker.sh $PROJECT $VERSION $REPO

exit 0