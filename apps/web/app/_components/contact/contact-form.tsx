"use client";

import { Input } from "components/input";
import SubmitButton from "components/submit-button";
import cn from "libs/cn";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showToast } from "utils/toast-config";
import { CreateContactDto } from "@humming-vision/shared";
import { publicApi } from "libs/axios";

type ContactFormData = Omit<CreateContactDto, "isRead">;

const contactSchema = z.object({
  name: z
    .string({ required_error: "이름은 필수입니다" })
    .min(1, "이름을 입력해주세요"),
  company: z.string().optional(),
  email: z
    .string({ required_error: "이메일은 필수입니다" })
    .email("올바른 이메일을 입력해주세요")
    .min(1, "이메일을 입력해주세요"),
  subject: z.string().optional(),
  message: z
    .string({ required_error: "내용은 필수입니다" })
    .min(1, "내용을 입력해주세요"),
}) satisfies z.ZodType<ContactFormData>;

const CONTACT_FIELDS: Array<{
  id: keyof ContactFormData;
  label: string;
  placeholder: string;
  required: boolean;
  type: "input" | "textarea";
}> = [
  {
    id: "name",
    label: "이름",
    placeholder: "이름",
    required: true,
    type: "input" as const,
  },
  {
    id: "company",
    label: "회사명",
    placeholder: "기업/ 단체명",
    required: false,
    type: "input" as const,
  },
  {
    id: "email",
    label: "이메일",
    placeholder: "이메일",
    required: true,
    type: "input" as const,
  },
  {
    id: "subject",
    label: "제목",
    placeholder: "문의제목",
    required: false,
    type: "input" as const,
  },
  {
    id: "message",
    label: "내용",
    placeholder: "내용을 입력해주세요.",
    required: true,
    type: "textarea" as const,
  },
] as const;

interface ContactFormProps {
  isContactPage?: boolean;
}

function ContactForm({ isContactPage }: ContactFormProps) {
  const [focusedField, setFocusedField] = useState<
    keyof ContactFormData | null
  >(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await publicApi.post("/api/contact", data);
      reset();

      showToast.success(
        "문의가 등록되었습니다. 빠른 시일 내에 답변드리겠습니다.",
      );
    } catch (error) {
      console.error("Contact submission error:", error);
      showToast.error("문의 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <form
      className={cn("flex w-full flex-col gap-5 xl:flex-row", {
        "xl:flex-col": isContactPage,
      })}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={cn(
          "mb-5 grid w-full grid-cols-[auto_1fr] items-center gap-y-7 xl:order-2 xl:mb-0 xl:ml-16",
          {
            "xl:ml-0": isContactPage,
          },
        )}
      >
        {CONTACT_FIELDS.map(({ id, label, placeholder, required, type }) => {
          const fieldError = errors[id];

          const { onBlur: originalOnBlur, ...fieldProps } = register(id);

          return (
            <Fragment key={id}>
              <p
                className={cn(
                  "text-gray600 border-gray300 flex h-full w-24 items-center border-b text-base font-normal",
                  {
                    "items-start pt-2.5": label === "내용",
                    "border-b-red-500": fieldError,
                    "text-main border-b-main": focusedField === id,
                  },
                )}
              >
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
              </p>
              <div className="relative flex flex-col">
                {type === "input" ? (
                  <Input
                    variant="underline"
                    className={cn("!border-b-gray300", {
                      "!border-b-red-500": fieldError,
                      "!border-b-main": focusedField === id,
                    })}
                    placeholder={placeholder}
                    onFocus={() => setFocusedField(id)}
                    onBlur={(e) => {
                      setFocusedField(null);
                      originalOnBlur(e);
                    }}
                    {...fieldProps}
                  />
                ) : (
                  <textarea
                    className={cn(
                      "border-b-gray300 h-60 w-full resize-none border-0 border-b bg-transparent px-3 pt-2.5 text-base font-normal focus:outline-none",
                      {
                        "border-b-red-500": fieldError,
                        "border-b-main": focusedField === id,
                      },
                    )}
                    placeholder={placeholder}
                    onFocus={() => setFocusedField(id)}
                    onBlur={(e) => {
                      setFocusedField(null);
                      originalOnBlur(e);
                    }}
                    {...fieldProps}
                  />
                )}
                {fieldError && (
                  <span className="absolute -bottom-5 left-3 text-sm text-red-500">
                    {fieldError.message}
                  </span>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
      <div className="flex items-end xl:order-3">
        <SubmitButton
          isSubmitting={isSubmitting}
          text="문의하기"
          loadingText="문의등록 중..."
        />
      </div>
    </form>
  );
}

export default ContactForm;
