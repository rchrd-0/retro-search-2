import { sValidator } from "@hono/standard-validator";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { ValidationTargets } from "hono";
import { ValidationError } from "./errors";

export const validate = <T extends keyof ValidationTargets, S extends StandardSchemaV1>(
  target: T,
  schema: S,
) => {
  return sValidator(target, schema, (result, _c) => {
    if (!result.success) {
      throw new ValidationError(result.error);
    }
  });
};
