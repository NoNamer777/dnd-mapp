#!/usr/bin/env bash

printf "Running migrations"

typeorm-ts-node-commonjs migration:run -d packages/server/typeorm/config.dev.ts


printf "\n\nStarting server"

nx serve server
