#!/bin/bash

PROJECT=$1
VERSION=$2
REPO=$3


docker build -t $PROJECT:latest $PROJECT/
docker tag $PROJECT:latest $REPO/$PROJECT:latest
docker tag $PROJECT:latest $REPO/$PROJECT:$VERSION
docker push $REPO/$PROJECT:latest
docker push $REPO/$PROJECT:$VERSION

exit 0