import type { StandardSchemaV1 } from "@standard-schema/spec";

export class ValidationError extends Error {
  public readonly issues: readonly StandardSchemaV1.Issue[];

  constructor(issues: readonly StandardSchemaV1.Issue[]) {
    super("Validation Error");
    this.name = "ValidationError";
    this.issues = issues;
  }
}
