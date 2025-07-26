"use client";

import Link from "next/link";
import { Ghost } from "lucide-react"; // 아이콘

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <Ghost className="text-gray300 mb-6 size-14" />
      <h1 className="text-gray900 text-3xl font-bold">
        페이지를 찾을 수 없어요
      </h1>
      <p className="text-gray400 mt-2">
        요청하신 페이지가 존재하지 않거나
        <br />
        이동되었을 수 있어요.
      </p>
      <Link
        href="/"
        className="bg-primary hover:bg-primary/90 mt-6 rounded-md px-5 py-2 text-sm font-semibold text-white transition"
      >
        메인으로 돌아가기
      </Link>
    </div>
  );
}
