"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react"; // 아이콘 사용 (lucide-react 설치 필요)

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <AlertTriangle className="mb-4 size-12 text-red-500" />
      <h2 className="text-gray900 text-2xl font-bold">문제가 발생했어요!</h2>
      <p className="text-gray600 mt-2">
        페이지를 불러오는 중 오류가 발생했습니다.
        <br />
        다시 시도해주세요.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
      >
        다시 시도하기
      </button>
    </div>
  );
}
