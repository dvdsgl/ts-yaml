/**
 * The branch pattern defining which branches will include this step in their builds.
 *
 * Example: "master stable/*"
 */
type BranchPattern = string;

interface Step {
  /**
   * The shell command/s to run during this step. This can be a single line of commands,
   * or a YAML list.
   */
  command: string | string[];
  /**
   * The label that will be displayed in the pipeline visualisation in Buildkite.
   * Supports emoji.
   * */
  label?: string;
  /**
   * The branch pattern defining which branches will include this step in their builds.
   */
  branches?: BranchPattern;
  /**
   * A map of environment variables for this step.
   */
  env?: {
    [name: string]: string;
  };
  /**
   * A map of meta-data keys to values to target specific agents for this step.
   */
  agents?: {
    [key: string]: string;
  };
  /**
   * The glob path or paths of artifacts to upload from this step. This can be
   * a single line of paths separated by semicolons, or a YAML list.
   *
   * Example: "logs/*coverage/**
   */
  artifact_paths?: string;
  /**
   * The number of parallel jobs that will be created based on this step.
   */
  parallelism?: number;
  /**
   * The maximum number of jobs created from this step that are allowed to run
   * at the same time. If you use this attribute, you must also define a label
   * for it with the concurrency_group attribute.
   */
  concurrency?: number;
  /**
   * A unique name for the concurrency group that you are creating with the
   * concurrency attribute.
   *
   * Example: "my-app/deploy"
   */
  concurrency_group?: string;
  /**
   * The number of minutes a job created from this step is allowed to run.
   * If the job does not finish within this limit, it will be automatically
   * cancelled and the build will fail.
   */
  timeout_in_minutes?: number;
  /**
   * Whether to skip this step or not.
   *
   * Note: Skipped steps will be hidden in the pipeline view by default,
   * but can be made visible by toggling the 'Skipped jobs' icon.
   */
  skip?: boolean | string;
  /**
   * The conditions for retrying this step.
   *
   * automatic:
   *   Whether to allow a job to retry automatically. This field accepts a boolean value,
   *   individual retry conditions, or a list of multiple different retry conditions.
   *   If set to true, the retry conditions are set to the default value.
   *
   * manual:
   *   Whether to allow a job to be retried manually. This field accepts a boolean value,
   *   or a single retry condition.
   */
  retry?:
    | { automatic: boolean | AutomaticRetryConditions }
    | { manual: boolean | ManualRetryConditions };
}

interface AutomaticRetryConditions {
  /**
   * The exit status number that will cause this job to retry.
   */
  exit_status?: "*" | number;
  /**
   * The number of times this job can be retried. The maximum value this can be set to is 10.
   */
  limit?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

interface ManualRetryConditions {
  /**
   * A boolean value that defines whether or not this job can be retried manually.
   */
  allowed?: boolean;
  /**
   * A string that will be displayed in a tooltip on the Retry button in Buildkite.
   * This will only be displayed if the allowed attribute is set to false.
   */
  reason?: string;
  /**
   * A boolean value that defines whether or not this job can be retried after it has passed.
   */
  permit_on_pass?: boolean;
}

interface TriggerStep {
  /**
   * The slug of the pipeline to create a build. The pipeline slug must be
   * lowercase.
   *
   * Example: "another-pipeline"
   */
  trigger: string;
  /**
   * An optional map of attributes for the triggered build.
   */
  build?: {
    /**
     * The message for the build. Supports emoji. Default: the label of the trigger step.
     * */
    message?: string;
    /**
     * 	The commit hash for the build. Default: "HEAD"
     * */
    commit?: string;
    /**
     * The branch for the build. Default: "master".
     */
    branch?: string;
    /**
     * A map of meta-data for the build.
     */
    meta_data?: {
      [key: string]: string;
    };
    /**
     * A map of environment variables for the build.
     */
    env?: {
      [name: string]: string;
    };
  };
  /**
   * The label that will be displayed in the pipeline visualisation in Buildkite.
   * Supports emoji.
   */
  label?: string;
  /**
   * If set to true the step will immediately continue, regardless of the success
   * of the triggered build. If set to false the step will wait for the triggered
   * build to complete and continue only if the triggered build passed
   *
   * Default value: false
   */
  async?: boolean;
  /**
   * The branch pattern defining which branches will include this step in their builds.
   */
  branches?: BranchPattern;
}

/**
 * A wait step waits for all previous steps to have successfully completed
 * before allowing following jobs to continue.
 */
type WaitStep = "wait" | { wait: string; continue_on_failure: boolean };

declare const wait = "wait";

interface BlockStep {
  /**
   * The label that will be displayed in the pipeline visualisation in Buildkite. Supports emoji.
   */
  block: string;
  /**
   * The instructional message displayed in the dialog box when the unblock step is activated.
   */
  prompt?: string;
  /**
   * A list of input fields required to be filled out before unblocking the step.
   */
  fields?: Array<"text" | "select">;
  /**
   * The branch pattern defining which branches will include this block step in their builds.
   */
  branches?: BranchPattern;
}

type AnyStep = Step | WaitStep | BlockStep;

/** List of steps to run in order */
declare var steps: AnyStep[];
