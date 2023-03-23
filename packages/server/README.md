# DnD-Mapp Server

This project contains the back-end application for the DnD Mapp project.

This project is written in the [Nest.js](https://nestjs.com) framework, v9.0.0.

## Commands

The available commands are:

-   **To build the application**

```shell
nx run server:build
```

To build it in development (watch) mode:

```shell
nx run server:build --watch
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
nx run server:test --watchAll
```

## Docker

A Docker image can be made locally of this project by running the following command in a terminal in the root of this
repository:

```shell
nx run server:docker-build
```

After that you can create a container by running the following command:

```shell
docker run -it -d -p 8080:80/tcp --name dnd-mapp-server dnd-mapp/server
```
