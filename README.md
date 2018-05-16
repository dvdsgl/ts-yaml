# ts-yaml

YAML is awesome!

* Easy to learn.
* Minimal syntax.

But it has some drawbacks, especially as YAML files scale.

* No types/code completion.
* Ambiguous syntax.
* No control flow (e.g. ternary operator, functions, `map`).

This is an experiment to define types for YAML in TypeScript, with the goal of easily generating typechecked YAML.

## Examples

### quicktype's Buildkite pipleines

```yaml
steps:
  - command: "FIXTURE=cplusplus,schema-cplusplus,kotlin,graphql .buildkite/build-pr.sh"
    label: "C++ Kotlin GraphQL"

  - command: "FIXTURE=java,schema-java,schema-json-csharp .buildkite/build-pr.sh"
    label: "java schema-json-c#"

  - command: "FIXTURE=typescript,schema-typescript,javascript,schema-javascript,flow,schema-flow,json-ts-csharp .buildkite/build-pr.sh"
    label: "typescript javascript flow"

  - command: "FIXTURE=swift,schema-swift,rust,schema-rust,elm,schema-elm .buildkite/build-pr.sh"
    label: "swift rust elm"

  - command: "FIXTURE=csharp,schema-csharp,ruby,schema-ruby,golang,schema-golang .buildkite/build-pr.sh"
    label: "csharp ruby golang"
```

This could be written in TypeScript as `steps.yaml.ts`:

```typescript
const fixtures = [
  "cplusplus,schema-cplusplus,kotlin,graphql",
  "java,schema-java,schema-json-csharp",
  "typescript,schema-typescript,javascript,schema-javascript,flow,schema-flow,json-ts-csharp",
  "swift,schema-swift,rust,schema-rust,elm,schema-elm",
  "csharp,schema-csharp,ruby,schema-ruby,golang,schema-golang"
];

export default {
  steps: fixtures.map(fixture => ({
    command: `FIXTURE=${fixture} .buildkite/build-pr.sh`,
    label: fixture
  }))
};
```

Using:

* String interpolation
* Data
* `map`

Output YAML with `ts-yaml steps.yaml.ts`.
