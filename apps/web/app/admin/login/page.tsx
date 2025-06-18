"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { EmailSVG, LockSVG, SpinnerSVG } from "public/svg/index";
import { useRouter } from "next/navigation";
import { ADMIN_ROUTE_PATH, AdminRoutePath } from "consts/route.const";
import { useAdminStore } from "stores/use-admin.store";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식을 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { setAdmin } = useAdminStore();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginFormData) => {
      const response = await fetch(
        `/api/admin/login?email=${email}&password=${password}`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        const errorMessage =
          result.message ||
          (result.status === 401
            ? "로그인 실패: 잘못된 이메일 또는 비밀번호입니다."
            : "로그인에 실패했습니다.");
        throw new Error(errorMessage);
      }

      return result;
    },
    onSuccess: (data) => {
      // Zustand 스토어에 관리자 정보 저장
      setAdmin(data.admin);

      // 관리자 페이지로 이동
      router.push(`${ADMIN_ROUTE_PATH}${AdminRoutePath.CONTACT}`, {
        scroll: false,
      });
    },
    onError: (error: Error) => {
      setError("root", {
        type: "server",
        message: error.message,
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-gray600 mb-2 text-3xl font-bold">
            관리자 로그인
          </h1>
          <p className="text-gray400">관리자 계정으로 로그인해주세요</p>
        </div>

        <div className="border-gray200 rounded-2xl bg-white p-8 sm:border sm:shadow-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="text-gray500 mb-2 block text-sm font-medium"
              >
                이메일
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <EmailSVG className="text-gray300 size-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    onChange: () => clearErrors("root"),
                  })}
                  className={`focus:ring-main block w-full rounded-lg border py-3 pr-3 pl-10 transition-colors focus:border-transparent focus:ring-2 focus:outline-none ${
                    errors.email ? "border-red-500" : "border-gray200"
                  }`}
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-gray500 mb-2 block text-sm font-medium"
              >
                비밀번호
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockSVG className="fill-gray300 size-5" />
                </div>
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    onChange: () => clearErrors("root"),
                  })}
                  className={`focus:ring-main block w-full rounded-lg border py-3 pr-3 pl-10 transition-colors focus:border-transparent focus:ring-2 focus:outline-none ${
                    errors.password ? "border-red-500" : "border-gray200"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}{" "}
            </div>
            {errors.root && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">{errors.root.message}</p>
              </div>
            )}{" "}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="bg-main hover:bg-main focus:ring-main flex w-full items-center justify-center rounded-lg px-4 py-3 font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loginMutation.isPending ? (
                <>
                  <SpinnerSVG className="mr-3 -ml-1 size-5 animate-spin text-white" />
                  로그인 중...
                </>
              ) : (
                "로그인"
              )}
            </button>
          </form>
        </div>
        <div className="text-gray300 mt-8 text-center text-sm">
          <p>© 2025 Humming Vision. 관리자 전용 페이지입니다.</p>
        </div>
      </section>
    </main>
  );
}
