# Siosa

## Requirement

- [Docker](https://www.docker.com/)
- [nvm](https://github.com/nvm-sh/nvm)
- Node ^14.3.0

## Install

```
docker-compose -f docker-compose-db.yml up --build -d
yarn install
yarn typeorm migration:run
yarn dev
```
