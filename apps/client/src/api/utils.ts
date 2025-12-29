import { flatten, ValiError } from "valibot";

export const handleValidationError = (error: unknown) => {
  if (error instanceof ValiError) {
    const errors = flatten(error.issues);
    console.error("Validation errors:", errors);

    return { error: "validation", details: errors };
  }

  throw error;
};
