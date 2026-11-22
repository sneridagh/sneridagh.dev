# DevOps Operations for sneridagh.dev 🚀

Welcome to the DevOps documentation for sneridagh.dev! In this guide, we'll walk you through the setup and deployment process, ensuring a smooth and efficient development workflow. We leverage the power of [Ansible](https://www.ansible.com/), [Docker](https://www.docker.com/), and [Docker Swarm](https://docs.docker.com/engine/swarm/) to automate, containerize, and orchestrate application deployment. 🛠️🐳🌐

- **Ansible** empowers us to automate tasks like software provisioning, configuration management, and application deployment. It's like having a robot assistant that takes care of the repetitive tasks, freeing you to focus on more strategic activities! 🤖✨

- **Docker** encapsulates our application and its dependencies into a container to ensure consistency across multiple development, testing, and deployment environments. It's like packing your entire application, including the environment it runs in, into a portable box that you can run anywhere! 📦🚀

- **Docker Swarm** takes it a step further by turning a group of Docker engines into a single, virtual Docker engine. It allows us to deploy our containers across multiple machines, enhancing availability and scalability. It's like having a swarm of bees working harmoniously to build, run, and scale your application! 🐝🌟

### Our Docker Stack 📚

We deploy a robust website running [Plone](https://plone.org/) using a Docker stack that consists of:

- **Traefik:** Serves as the router and SSL termination, integrated with [Let's Encrypt](https://letsencrypt.org/) for free SSL certificates, ensuring that our website is secure and trusted. 🔒🌐

- **Plone Frontend using Volto:** A modern, fast, React-based frontend that delivers an exceptional user experience. It's like having a sleek, high-performance car to navigate the web! 🏎️💨

- **Plone Backend:** Responsible for the API, it's the engine under the hood, ensuring that data is processed, stored, and retrieved efficiently. 🏭🚀

- **Postgres 14 Database:** A reliable, robust database to store the site data, ensuring that our content is safe, secure, and quickly accessible. 🗃️⚡

- **Nick:** The Node.js backend that serves the Plone REST API, at [nick.sneridagh.dev](https://nick.sneridagh.dev), with its own **Postgres 18** database (`db-nick`). The image is built from [`nick/`](../nick/README.md). It runs side by side with the Plone backend until the site is migrated to it. 🟢


Now, let’s dive into the setup! 🏊‍♂️💫
## Setup

Ensure you navigate to the `devops` folder before executing any commands listed in this document. From the root of your repository, execute:

```shell
cd devops
```

### Environment Configuration

Start by creating an `.env` file in the `devops` folder. You can copy the existing `.env_dist` file as a starting point:

```shell
cp .env_dist .env
```

Edit the `.env` file to suit your environment. For example:

```
DEPLOY_ENV=prod
DEPLOY_HOST=sneridagh.dev
DEPLOY_PORT=22
DEPLOY_USER=plone
DOCKER_CONFIG=.docker
STACK_NAME=sneridagh-dev
```

Note: The `.env` file is included in `.gitignore`, ensuring environment-specific configurations aren't pushed to the repository.

### Ansible Installation

Execute the following to create a Python 3 virtual environment and install Ansible along with its dependencies:

```shell
make setup
```

### Inventory Configuration

Modify `devops/inventory/hosts.yml` with the appropriate connection details:

```yaml
---
prod:
  hosts:
    sneridagh.dev:
      ansible_user: root
      host: sneridagh
      hostname: sneridagh.dev
```

## Server Setup

With the correct information in `devops/inventory/hosts.yml`, initiate the remote server setup:

```shell
make server-setup
```

This command executes the Ansible playbook `devops/playbooks/setup.yml` on the remote server, performing various setup tasks including user creation, SSH setup, Docker installation, and more.

## Project Deployment

### Docker Configuration

Ensure you're logged into your Docker account as the deployment uses public images. Then, create a new Docker context for the remote server:

```shell
make docker-setup
```

Verify the configuration with:

```shell
make docker-info
```

### Stack Deployment

Go to the server and add manually a public network scoped for all the cluster:

```shell
docker network create --driver overlay --opt com.docker.network.driver.mtu=1450 public
```

Deploy the stack defined in `devops/stacks/sneridagh.dev.yml` to the remote server with:

```shell
make stack-deploy
```

### Stack Status Verification

Check the status of all services in your stack:

```shell
make stack-status
```

### Plone Site Creation

If deploying for the first time, the frontend containers might not be `healthy` due to the absence of a configured Plone site on the backend. Create a new site with:

```shell
make stack-create-site
```

### Nick

The `nick` and `db-nick` services need these variables in the stack environment (the `ENV_FILE` secret of the GitHub environment, see [README-GHA.md](README-GHA.md)). Deploying the stack fails while `NICK_DB_PASSWORD` or `NICK_SECRET` is missing:

| Variable              | Description                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| `NICK_DB_PASSWORD`    | Password of the `nick` Postgres user. Postgres only reads it when it creates the database.              |
| `NICK_SECRET`         | Secret that signs the authentication tokens, for example the output of `openssl rand -hex 32`.         |
| `NICK_ADMIN_PASSWORD` | Password of the `admin` user. Only read on the first start, when the empty database is set up.         |

Before the first deployment:

- Create the data folder `/srv/sneridagh-dev/nick-data` (owned by `999:999`, mode `0750`) on the server, with `make server-setup` or by hand.
- Point the DNS record of `nick.sneridagh.dev` to the server, so Traefik can get its certificate.

### Log Monitoring

Monitor logs for each service using the commands below:

- Traefik: ```make logs-webserver```
- Frontend: ```make logs-frontend```
- Backend: ```make logs-backend```
- Nick: ```make stack-logs-nick```
