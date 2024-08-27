# Dev Container Features

This a collection of dev container features we use at Adaptavist that didn't
already exist.

## atlassian-forge

This installs the
[Atlassian Forge CLI](https://developer.atlassian.com/platform/forge/cli-reference)
globally via npm.

**Example devcontainer.json:**
```json
{
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",

  "features": {
    "ghcr.io/adaptavist/devcontainer-features/atlassian-forge:1": {
      "version": "latest"
    }
  },

  "containerEnv": {
    "FORGE_API_TOKEN": "${localEnv:FORGE_API_TOKEN}",
    "FORGE_EMAIL": "${localEnv:FORGE_EMAIL}"
  }
}
```

You'll need to login to forge, which can be done manually within the container
using [forge login](https://developer.atlassian.com/platform/forge/cli-reference/login),
or you can set `FORGE_API_TOKEN` and `FORGE_EMAIL` locally (to be inherited by
the container).

To check your login:

```sh
$ forge whoami
```
