import { ZodTypeAny } from "zod";

function parseValueBasedOnKey(key: string, value: string | string[]) {
  if (key.includes("__between")) {
    const values = Array.isArray(value) ? value : value.split(",");
    return values.map(Number);
  }
  return value;
}

export function buildValidatedQuery<T extends ZodTypeAny>(
  rawParams: Record<string, string | string[] | undefined>,
  schema: T,
): URLSearchParams {
  const parsedParams: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(rawParams)) {
    if (value == null) continue;

    try {
      const parsed = parseValueBasedOnKey(key, value);
      parsedParams[key] = parsed;
    } catch {
      // skip invalid
    }
  }

  const safeResult = schema.safeParse(parsedParams);

  const urlParams = new URLSearchParams();

  if (safeResult.success) {
    const validParams = safeResult.data;

    for (const [key, value] of Object.entries(validParams)) {
      if (Array.isArray(value)) {
        urlParams.append(key, value.join(","));
      } else {
        urlParams.append(key, String(value));
      }
    }
  }

  return urlParams;
}
