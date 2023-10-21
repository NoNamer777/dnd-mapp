# DnD-Mapp Server

This project contains the back-end application for the DnD Mapp project.

This project is written in the [Nest.js](https://nestjs.com) framework, `~v10.2.0`. It uses [TypeOrm](https://typeorm.io/) `~v0.3.0` for handling database connections and interactions, which currently only supports MySQL or Sqlite databases.

## Configuration

To configure this server application you can create a `.env` file within the root of the server project and pass its location to the server's process via an environment variable. The format of the configuration file is as follows:

```.env
# ./packages/server/.env

# Whether to run the server in production mode.
PRODUCTION=true | false

# On which IP address to run the server process.
HOST=localhost

# On which port ro run the server process.
PORT=8080

# The certificate and key to run the server in ssl (https). 
# By default, the server doesn't come with a certificate and key so that must be provided.
SSL_CERT_PATH=./certificate.pem

SSL_KEY_PATH=./certificate-key.pem

# The type of database. Supported database types are: MySQL or Sqlite. 
# By default, the server will use an in-memory Sqlite database
DATABASE_TYPE=mysql | sqlite

# The name of the database.
# For Sqlite this can also point to a database file (e.g. "mydb.db") or use ":memory:" to run use an in-memory database.
DATABASE_LOCATION=mydb.db | :memory: | <mysql-database-name>

# Which database logs will be included in the log output.
# Use a comma seperated list to definve the various levels of logs to be included.
# By default, it will include the ['info', 'warn', 'error'] logs.
DATABASE_LOG_LEVEL=info,error,warn(,query,schema,log)

# How to handle the database logs. By default, this will fall back to the default set by TypeOrm, which is
# 'advanced-console' Other options include: 'advanced-console', 'simple-console', 'file', or 'debug'.
DATABASE_LOG_TYPE=simple-console

# Properties below are only required for MySQL databases
# The IP address of the database.
MYSQL_HOST=localhost

# The port on which the database is accessible.
MYSQL_PORT=3306

# The name of the user to connect to the database.
MYSQL_USERNAME=username

# The password to authenticate the database user.
MYSQL_PASSWORD=password
```

## Developing with SSL

Assuming you've followed the instructions in the README in the root of this repository, you can enable ssl for your local dev environment. This you can accomplish by, passing the paths to the generated certificate and its key via the server configuration file.

## Database migrations

When setting up a database, the server is configured to use migrations to build up the database iteratively so that no data is lost on restart of the server application. For more information on how to use, or create these migration files, please refer to [the official documentation of TypeORM](https://typeorm.io/migrations).

In order to run the database migrations you'll need to provide your datasource configuration so that TypeORM is aware of what type of database is used and where it can find the migrations files. Your configuration should look like the following:

```typescript
import { DataSource } from 'typeorm';

// Example of a MySQL database configuration
const MysqlConfig = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'database',
    username: 'username',
    password: 'password',
    migrations: ['path/to/migration/files/*.ts'],
});

// Example of a Sqlite database configuration
const SqliteConfig = new DataSource({
    type: 'sqlite',
    database: 'mydatabase.db',
    migrations: ['path/to/migration/files/*.ts'],
});

export default MysqlConfig;
```

## Commands

The available commands are:

-   **To build the application**

```shell
nx run server:build
```

To build it in development (watch) mode:

```shell
nx run server:build:dev
```

-   **To start the development application**

```shell
npm run server:start
```

This will make sure your development database, which you should have configured by now, will be migrated at least once, before the server will start.

-   **To run the tests**

```shell
nx run server:test
```

To run the test in watch mode:

```shell
# This will rerun all the tests after changes are detected.
nx run server:test:dev
```

## Docker

A Docker image can be made locally of this project by running the following command in a terminal in the root of this repository:

```shell
nx run server:docker-build
```

After that you can create a container by running the following command:

```shell
docker run -it -d -p 8080:80/tcp --name dnd-mapp-server nonamer777/dnd-mapp-server
```

### Docker compose

To use the docker images that are build on every push to the main branch you can use the following format:

```yaml
# ./compose.yaml

version: '3'
services:
    server:
        container_name: 'dnd-mapp-server'
        image: 'ghcr.io/nonamer777/dnd-mapp-server:dev'
        # NOTE: Make sure that the exposed container port matches with the port on which the server is configured to run on
        ports:
            - '8080:8080'
        environment:
            - 'SERVER_CONFIG_PATH=./server-config.yaml'
        volumes:
            # Passing along the server configuration
            - './server-config.yaml:/usr/src/app/server-config.yaml'

            # When using a Sqlite database, and it has been set to persist the data to a file, You must create a database file,
            # and pass that along to the container for persistance.
            - './dnd-mapp.db:/usr/src/app/dnd-mapp.db'

            # Passing along the certificate and key to enable ssl
            - './certificate.pem:/usr/src/app/certificate.pem'
            - './certificate-key.pem:/usr/src/app/certificate-key.pem'

            # Scripts to iteratively build up the database
            - './migrations:/usr/src/app/migrations'
```
