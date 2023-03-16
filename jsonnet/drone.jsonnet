local drone = import 'github.com/Duologic/drone-libsonnet/main.libsonnet';

local pipeline = drone.pipeline.docker;
local step = drone.pipeline.docker.step;

local registry = 'us.gcr.io';
local repo = 'kubernetes-dev/github-rate-limit-prometheus-exporter';
local image_to_push = registry + '/' + repo;

local gcr_secret = drone.secret.new('gcr_admin', 'infra/data/ci/gcr-admin', 'service-account');

local images = {
  drone_plugin: 'plugins/docker',
  docker_plugin_gcr: 'plugins/gcr',
};

local modified_paths = [
  'go.mod',
  'go.sum',
  '**/*.go',
  '.drone.yml',
];

local generateTagsCommands = [
  // `.tags` is the file consumed by the Docker (GCR inluded) plugins
  // to tag the built Docker image accordingly.
  // It is a comma-separated list of tags.
  'echo -n "${DRONE_BRANCH}-${DRONE_COMMIT_SHA},latest" > .tags',
];

local pipelines = {
  build_test:
    pipeline.new('build pipeline')
    + pipeline.withSteps([
      step.new('build + test', image=images.drone_plugin)
      + step.withSettings({
        dry_run: true,
        repo: image_to_push,
        tags: 'latest',
      }),
    ])
    + pipeline.trigger.onModifiedPaths(modified_paths)
    + pipeline.trigger.onPullRequest(),
  build_test_push:
    pipeline.new('build and push pipeline')
    + pipeline.withSteps([
      step.new('Generate tags', image=images.docker_plugin_gcr)
      + step.withCommands(generateTagsCommands),
      step.new('build + test + push', image=images.docker_plugin_gcr)
      + step.withSettings({
        repo: repo,
        json_key: { from_secret: gcr_secret.name },
        registry: registry,
      }),
    ])
    + pipeline.trigger.onModifiedPaths(modified_paths)
    + pipeline.trigger.onPushToMasterBranch(),
};

local secrets = {
  secrets: [
    gcr_secret,
  ],
};

drone.render.getDroneObjects(pipelines + secrets)
