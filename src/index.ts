import { dump } from "js-yaml";

export function yaml<T>(t: T): void {
  console.log(dump(t));
}
