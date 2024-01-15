# DnD-Mapp Back-end application

This project contains the back-end application for the DnD Mapp platform.

This project is written in the [Nest.js](https://nestjs.com) framework, `v10`. It uses [TypeOrm](https://typeorm.io/) `v0.3` for handling database connections and interactions, which currently only supports MySQL or Sqlite databases.

## Configuration

To configure this server application you can create a `.env` file within the root of the server project and pass its location to the server's process via an environment variable. The format of the configuration file is as follows:

```.env
# ./packages/server/.env

# Whether to run the server in production mode.
PRODUCTION=true | false

# On which IP address to run the server process.
HOST=localhost

# On which port ro run the server process.
PORT=80

# The domain from which the back-end is available, should the app be containerized for example.
ADDRESS=example.com

# Whether to use SSL or not (Independant of if the certifcate and key are provided).
USE_SSL=true | false

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

## Commands

The available commands are:

-   **To build the application**

```shell
npx nx build server
```

To build it in development (watch) mode:

```shell
npx nx build server -c dev
```

-   **To start the development application**

```shell
npx nx start server
```

-   **To run the tests**

```shell
npx nx test server
```

To run the test in watch mode:

```shell
# This will rerun all the tests after changes are detected.
npx nx test server -c dev
```
