import React from "react";
import { ArrowRight, Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({
  message = "파일을 로딩중입니다...",
}: LoadingStateProps) => (
  <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-60 md:px-10">
    <div className="flex min-h-64 items-center justify-center">
      <div className="text-center">
        <div className="border-main mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  </main>
);

interface ErrorStateProps {
  error: Error | unknown;
  onRetry?: () => void;
  onSkip?: () => void;
  retryText?: string;
  skipText?: string;
}

export const ErrorState = ({
  error,
  onRetry,
  onSkip,
  retryText = "다시 시도",
  skipText = "파일 없이 진행",
}: ErrorStateProps) => (
  <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-60 md:px-10">
    <div className="flex min-h-64 items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-red-500">
          <svg
            className="mx-auto mb-2 h-12 w-12"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          파일 로딩 실패
        </h3>
        <p className="mb-4 text-gray-600">
          {error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다."}
        </p>
        <div className="space-x-4">
          {onRetry && (
            <button
              onClick={onRetry}
              className="bg-main hover:bg-main-dark focus:ring-main inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              {retryText}
            </button>
          )}
          {onSkip && (
            <button
              onClick={onSkip}
              className="focus:ring-main inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              {skipText}
            </button>
          )}
        </div>
      </div>
    </div>
  </main>
);

interface ProductFormLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const ProductFormLayout = ({
  title,
  children,
}: ProductFormLayoutProps) => (
  <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-60 md:px-10">
    <hr className="border-gray200 absolute left-0 w-screen border-t" />
    <div className="border-main mb-5 border-b py-5.5 sm:gap-0">
      <h2 className="text-main text-2xl font-bold">{title}</h2>
    </div>
    {children}
  </main>
);
