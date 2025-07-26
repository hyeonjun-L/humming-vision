import { useUpdateSearchParams } from "hooks/useUpdateSearchParams";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ZodType, ZodError } from "zod";

export function useValidatedSearchParam<T>(
  key: string,
  schema: ZodType<T>,
): T | null {
  const searchParams = useSearchParams();
  const { deleteSearchParams } = useUpdateSearchParams();

  const rawValue = searchParams.get(key);
  const [validated, setValidated] = useState<T | null>(null);

  useEffect(() => {
    if (!rawValue) return;

    try {
      const parsed = schema.parse(rawValue);
      setValidated(parsed);
    } catch (err) {
      if (err instanceof ZodError) {
        deleteSearchParams(key);
        setValidated(null);
      }
    }
  }, [deleteSearchParams, key, rawValue, schema]);

  return rawValue ? validated : null;
}
