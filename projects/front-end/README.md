# DnD-Mapp Front-end Client Web Application

This project contains the front-end client web application for the DnD Mapp platform.

This project is written in the [Angular](https://angular.dev) framework, v17.

## Commands

The available commands are:

-   **To build the application**

```shell
nx run client:build
```

To build it in development (watch) mode:

```shell
nx run client:build:dev
```

-   **To serve the development application**

```shell
nx run client:serve
```

-   **To run the tests**

```shell
nx run client:test
```

To run the test in watch mode:

```shell
# This will rerun all the tests after changes are detected.
nx run client:test:dev
```

## Docker

A Docker image can be made locally of this project by running the following command in a terminal in the root of this
repository:

```shell
nx run client:docker-build
```

After that you can create a container by running the following command:

```shell
docker run -it -d -p 4200:80/tcp --name dnd-mapp-client dnd-mapp/client
```
