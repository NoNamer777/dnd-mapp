# Dnd-Mapp

This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Remote caching has been enabled to make CI faster. Find the Nx Cloud dashboard app
[here](https://cloud.nx.app/orgs/63c13e9e2f98d9000e5cd7fb/workspaces/6419b717cd130f2e52f37d48).

## Getting started

To get started with developing on these projects you first must install the dependencies by running the following
command in a terminal located at the root of the repository:

```shell
npm install
```

Find the README's in the individual projects for more information and instructions.

| Project name |                                     |
| ------------ | ----------------------------------- |
| Client       | [README](packages/client/README.md) |
| Server       | [README](packages/server/README.md) |
| Data         | [README](packages/data/README.md)   |

## Enable SSL on your development environment

It's required to use https while serving the back- and front-end applications.
To do so you'll need to generate a certificate and an adjoining key and configure your machine a bit to allow this.

### Set up localhost routing on your machine

To prevent cors errors when connecting to servers you first need to add a route to the local host file on your computer.

#### Edit host file on MacOS or Linux

The hosts file is located at `/etc/hosts`.

1. Open terminal and enter `sudo nano /etc/hosts` and enter password when asked.
2. Add line:

    ```
    127.0.0.1 localhost.dndmapp.net
    ```

3. You can save with Ctrl+O and close the editor with Ctrl+X

#### Edit host file on Windows

The hosts file is located at `c:\Windows\System32\Drivers\etc\hosts`.

1. Right click on Notepad in your start menu and select “Run as > Administrator”. This is crucial to ensure you can make the required changes to the file.
2. Now click File > Open and browse to: `c:\Windows\System32\Drivers\etc\hosts`.
3. Add line:

    ```
    127.0.0.1 localhost.dndmapp.net
    ```

4. Save and close editor

## Generating the certificate and key in the repository root

1. Install [mkcert](https://github.com/FiloSottile/mkcert) (MacOS: `brew install mkcert`)
2. Run `mkcert -install` to install the root CA (browser restart is required)
3. Run `mkcert -cert-file certificate.pem -key-file certificate-key.pem localhost.dndmapp.net localhost` to generate a certificate.

## Trusting the certificate on your machine

### Trusting the certificate on macOS

Double-click the `certificate.pem` file, you'll be prompted to add the certificate to the login keychain app.

Once added to the keychain, you can then select the created certificate from the `Keychain Access` window.
It can be difficult to find when there are multiple certificates.

Select the created certificate and right-click to select `Get Info` from the context menu. Then expand the `Trust` triangle.
You should then be able to select to `Always Trust` the certificate for `SSL`.

Close the panel and confirm the changes with password or fingerprint.

Now you should not see https warnings serving the applications with https. Applications already opened in the Chrome browser should be reloaded.

### Trusting the certificate on Windows

To add certificate.pem to the Trusted Root Certification Authorities store on Windows I need to start `Microsoft Management Console`.
This can be done by pressing `<Windows Key> + R` or searching for the `Run` desktop app. Then running run `mmc`.

Then go to `File > Add/Remove Snap-in…` and select `Certificates` for the current user:

Once that has been added, you should be able to navigate to:
Console Root \ Certificates - Current User \ Trusted Root Certification Authorities \ Certificates

Right-click on `Certificates` under `Trusted Root Certification Authorities` and select `All Tasks > Import…`.
Locate your `certificate.pem` file and import it. Once imported, you should be able to find it listed as a trusted certificate.

Close Microsoft Management Console (you do not need to save the console). Then **restart** the Chrome browser.

Now you should not see https warnings when serving the applications with https.

## Commands

Some commands are globally available, these include:

-   To check linting:

```shell
nx run-many --target=lint
```

-   To check formatting:

```shell
nx format:check
```

Alternatively, you can run the following command to fix the formatting:

```shell
nx format:write
```

## Docker

A Docker image can be made locally of this project by running the following command in a terminal in the root of this repository:

```shell
npm run docker:build

# OR
docker build -t nonamer777/dnd-mapp .
```

After that you can create a container by running the following command:

```shell
docker run -it -d -p 8080:80 --name dnd-mapp ghcr.io/nonamer777/dnd-mapp
```

### Docker compose

To use the docker images that are build on every push to the main branch you can use the following format:

```yaml
# ./compose.yaml
services:
    server:
        container_name: dnd-mapp
        image: ghcr.io/nonamer777/dnd-mapp:dev
        restart: unless-stopped
        ports:
            - '8080:80/tcp'
        env_file:
            - .env # Pass the environment variables in a single file
        volumes:
            # When using a Sqlite database, and it has been set to persist the data to a file, You must create a database file,
            # and pass that along to the container for persistence.
            - './dnd-mapp.db:/usr/src/app/dnd-mapp.db'
```
