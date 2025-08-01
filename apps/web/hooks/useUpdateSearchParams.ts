import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export function useUpdateSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateSearchParams = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      if (key !== "page") {
        params.set("page", "1");
      }

      router.replace(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const deleteSearchParams = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  return { updateSearchParams, deleteSearchParams };
}
