import "./yaml/buildkite";

const fixtures = [
  "cplusplus,schema-cplusplus,kotlin,graphql",
  "java,schema-java,schema-json-csharp",
  "typescript,schema-typescript,javascript,schema-javascript,flow,schema-flow,json-ts-csharp",
  "swift,schema-swift,rust,schema-rust,elm,schema-elm",
  "csharp,schema-csharp,ruby,schema-ruby,golang,schema-golang"
];

steps = fixtures.map(fixture => ({
  command: `FIXTURE=${fixture} .buildkite/build-pr.sh`,
  label: fixture
}));
