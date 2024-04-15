#!/bin/sh

# Deploy database changes
cd /usr/app/back-end

npx prisma migrate deploy --schema prisma/schema.prisma

# Start back-end application
node $(ls main*.js)
