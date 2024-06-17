
SHELL := $(shell which bash)
OSTYPE := $(shell uname)
DOCKER := $(shell command -v docker)
GID := $(shell id -g)
UID := $(shell id -u)
VERSION ?= $(shell git describe --tags --always)

UNIT_TEST_CMD := ./scripts/check/unit-test.sh
INTEGRATION_TEST_CMD := ./scripts/check/integration-test.sh
CHECK_CMD := ./scripts/check/check.sh

DEV_IMAGE_NAME := local/viator-sloth-slo-plugins-dev

DOCKER_RUN_CMD := docker run --env ostype=$(OSTYPE) -v ${PWD}:/src --rm ${DEV_IMAGE_NAME}
BUILD_DEV_IMAGE_CMD := IMAGE=${DEV_IMAGE_NAME} DOCKER_FILE_PATH=./docker/dev/Dockerfile VERSION=latest ./scripts/build/docker/build-image-dev.sh

help: ## Show this help
	@echo "Help"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "    \033[36m%-20s\033[93m %s\n", $$1, $$2}'

.PHONY: default
default: help

.PHONY: build-dev-image
build-dev-image:  ## Builds the development docker image.
	@$(BUILD_DEV_IMAGE_CMD)

.PHONY: test
test: build-dev-image  ## Runs unit test.
	@$(DOCKER_RUN_CMD) /bin/sh -c '$(UNIT_TEST_CMD)'

.PHONY: integration-test
integration-test: build-dev-image  ## Runs integration test.
	@$(DOCKER_RUN_CMD) /bin/sh -c '$(INTEGRATION_TEST_CMD)'

.PHONY: check
check: build-dev-image  ## Runs checks.
	@$(DOCKER_RUN_CMD) /bin/sh -c '$(CHECK_CMD)'

.PHONY: deps
deps:  ## Fixes the dependencies
	@$(DOCKER_RUN_CMD) /bin/sh -c './scripts/deps.sh'

