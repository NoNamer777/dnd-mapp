#!/bin/bash

printf "Running migrations"

npx nx run-migrations server


printf "\n\nStarting server"

node app/main.js
