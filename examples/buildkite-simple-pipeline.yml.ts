import "./yaml/buildkite";

// This is the Buildkite example pipeline, typechecked.
// https://buildkite.com/docs/pipelines/defining-steps#example-pipeline

steps = [
  {
    label: ":hammer: Tests",
    command: "scripts/tests.sh",
    env: {
      BUILDKITE_DOCKER_COMPOSE_CONTAINER: "app"
    }
  },
  wait,
  {
    label: ":package: Package",
    command: "scripts/build-binaries.sh",
    artifact_paths: "pkg/*",
    env: {
      BUILDKITE_DOCKER_COMPOSE_CONTAINER: "app"
    }
  },
  wait,
  {
    label: ":debian: Publish",
    command: "scripts/build-debian-packages.sh",
    artifact_paths: "deb/**/*",
    branches: "master",
    agents: {
      queue: "deploy"
    }
  },
  {
    block: ":shipit: Release",
    branches: "master"
  },
  {
    label: ":github: Release",
    command: "scripts/build-github-release.sh",
    artifact_paths: "releases/**/*",
    branches: "master"
  },
  wait,
  {
    label: ":whale: Update images",
    command: "scripts/release-docker.sh",
    branches: "master",
    agents: {
      queue: "deploy"
    }
  }
];
