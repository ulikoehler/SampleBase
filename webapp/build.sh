#!/bin/sh
ng build
docker build -t sample-base-webapp:latest .
docker run -p 62029:62029 sample-base-webapp:latest