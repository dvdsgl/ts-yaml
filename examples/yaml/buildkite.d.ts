interface NormalStep {
  command: string;
  /** Optional label for results display */
  label?: string;
  artifact_paths?: string;
  branches?: string;
  /** Optional environment variables */
  env?: {
    [name: string]: string;
  };
  agents?: {
    queue?: string;
  };
}

type WaitStep = "wait";

interface BlockStep {
  block: string;
  branches: string | string[];
}

type Step = NormalStep | WaitStep | BlockStep;

/** List of steps to run in order */
declare var steps: Step[];
