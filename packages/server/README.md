# DnD-Mapp Server

This project contains the back-end application for the DnD Mapp project.

This project is written in the [Nest.js](https://nestjs.com) framework, v9.0.0.
It uses [TypeOrm](https://typeorm.io/) (v0.3.12) for handling database connections and interactions, which currently
only supports MySQL or Sqlite databases.

## Configuration

To configure this server application you can create a yaml or yml file within this repository and pass its location to
the server's process via an environment variable. The format of the configuration file is as follows:

```yaml
# ./server-config.yaml

server:
    # Whether to run the server in production mode
    production: true

    # On which IP address to run the server process
    host: 'localhost'

    # On which port ro run the server process
    port: 8080

    # The certificate and key to run the server in ssl (https). By default, the server doesn't come with a certificate and
    # key so that must be provided
    ssl:
        cert: './certificate.pem'
        key: './certificate-key.pem'
database:
    # The type of database. Supported database types are: MySQL or Sqlite. By default, the server will use an in-memory Sqlite database
    type: 'mysql'

    # The name of the database. For Sqlite this can also point to a database file (eg. "mydb.db") or use ":memory:" to run
    # use an in-memory database.
    database: 'mydb'

    # The locations to look for code to handle database migrations which incrementally build up the database and its data
    migrations:
        - './migrations/*'
        - './different-path/migrations.js'

    # Which database logs will be included in the log output. By default, it will include the 'info', 'error', and 'warn' logs
    logging:
        - 'query'
        - 'error'
        - 'schema'
        - 'warn'
        - 'info'
        - 'log'

    # How to handle the database logs. By default, this will fall back to the default set by TypeOrm, which is 'advanced-console'
    # Other options include: 'advanced-console', 'simple-console', 'file', or 'debug'
    logger: 'simple-console'

    # Properties below are only required for MySQL databases
    # The IP address of the database
    host: 'localhost'

    # The port on which the database is accessible
    port: 3306

    # The name of the user to connect to the database
    username: 'username'

    # The password to authenticate the database user
    password: 'password'
```

To apply this configuration, you'll need to pass its path location via the environment variable `SERVER_CONFIG_PATH`.
This can be done via the commandline or via an `.env` file in the root of the project (NOT the repository)

## Developing with SSL

Assuming you've followed the instructions in the README in the root of this repository, you can enable ssl for your local
dev environment. This you can accomplish by, passing the paths to the generated certificate and its key via the server
configuration file.

## Database migrations

When setting up a database, the server is configured to use migrations to build up the database and it's data iteratively
so that no data is lost on restart of the server application. For more information on how to use, or create these migration
files, please refer to [the official documentation of TypeORM](https://typeorm.io/migrations).

Please note, that this server currently only support migration files in JavaScript format.

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

-   **To serve the development application**

```shell
nx run server:serve
```

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

A Docker image can be made locally of this project by running the following command in a terminal in the root of this
repository:

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

            # When using a Sqlite database and it has been set to persist the data to a file. You must create a database file,
            # and pass that along to the container
            - './dnd-mapp.db:/usr/src/app/dnd-mapp.db'

            # Passing along the certificate and key to enable ssl
            - './certificate.pem:/usr/src/app/certificate.pem'
            - './certificate-key.pem:/usr/src/app/certificate-key.pem'

            # Scripts to iteratively build up the database
            - './migrations:/usr/src/app/migrations'
```
