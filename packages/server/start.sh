#!/usr/bin/env bash

printf "Running migrations"

npx typeorm-ts-node-esm migration:run -d packages/server/typeorm/config.dev.ts


printf "\n\nStarting server"

nx serve server
