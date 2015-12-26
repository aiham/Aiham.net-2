# Aiham.net

## Pre-requisites

* Git
* Docker
* Docker Compose

## Install

```
git clone https://github.com/aiham/Aiham.net-2.git
cd Aiham.net-2/
docker-compose build
```

## Start

Builds static files and runs webserver. View at `http://docker-host-ip:8080`. Static files stored in `Aiham.net-2/dist/`.

```
docker-compose up -d
```

## Stop

Stops webserver and any running builds.

```
docker-compose kill
docker-compose rm
```

## Build Only

Builds static files only.

```
docker-compose run build
```
