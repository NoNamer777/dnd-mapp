#!/bin/bash

printf "Running migrations"

npx typeorm-ts-node-esm migration:run -d "$DATABASE_FILES_PATH/config.dev.ts"


printf "\n\nStarting server"

node app/main.js
