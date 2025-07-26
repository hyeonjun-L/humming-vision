import { z } from "zod";

export function createSafeParser<T>(schema: z.ZodSchema<T>, defaultValue: T) {
  return function safeParseSearchParams(
    searchParams: Record<string, string | undefined>,
  ): T {
    const result = schema.safeParse(searchParams);

    if (result.success) {
      return result.data;
    }

    return defaultValue;
  };
}

export function createParser<T>(schema: z.ZodSchema<T>) {
  return function parseSearchParams(
    searchParams: Record<string, string | undefined>,
  ): T {
    return schema.parse(searchParams);
  };
}
