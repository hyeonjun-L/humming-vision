"use client";

import { Contact } from "@humming-vision/shared";
import { formatDate, formatRelativeTime } from "utils/date";
import { useModalStore } from "stores/use-modal.store";
import { Mail, Calendar, User } from "lucide-react";
import { ArrowSVG } from "public/svg";

type ContactModalProps = {
  data: Contact;
  onDelete: (id: number) => Promise<void>;
};

function ContactModal({ data, onDelete }: ContactModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  const handleDeleteContact = async () => {
    try {
      await onDelete(data.id);
      closeModal();
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  return (
    <section className="bg-background absolute top-0 right-0 h-screen w-full max-w-md overflow-scroll shadow-2xl">
      <header className="border-gray200 flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-3">
          <div className="bg-main/10 flex h-10 w-10 items-center justify-center rounded-full">
            <Mail className="text-main size-5" />
          </div>
          <div>
            <h2 className="text-gray600 text-lg font-semibold">문의 상세</h2>
            <p className="text-gray400 text-sm">ID: {data.id}</p>
          </div>
        </div>
        <button
          onClick={closeModal}
          className="border-gray200 flex size-10 items-center justify-center rounded-full border"
          aria-label="모달 닫기"
        >
          <ArrowSVG className="stroke-main size-5 stroke-2" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <div className="bg-gray100 rounded-lg p-4">
            <h3 className="text-gray600 mb-3 flex items-center gap-2 text-sm font-medium">
              <User className="size-4" />
              연락처 정보
            </h3>
            <div className="space-y-2">
              <div>
                <label className="text-gray400 text-xs">이름</label>
                <p className="text-gray600 text-sm font-medium break-words">
                  {data.name}
                </p>
              </div>
              <div>
                <label className="text-gray400 text-xs">이메일</label>
                <p className="text-gray600 text-sm break-words">{data.email}</p>
              </div>
              {data.company && (
                <div>
                  <label className="text-gray400 text-xs">회사</label>
                  <p className="text-gray600 text-sm break-words">
                    {data.company}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-gray600 mb-2 text-sm font-medium">문의 제목</h3>
            <p className="text-gray600 bg-gray100 rounded-lg p-3 text-sm">
              {data.subject}
            </p>
          </div>

          <div>
            <h3 className="text-gray600 mb-2 text-sm font-medium">문의 내용</h3>
            <div className="bg-gray100 rounded-lg p-4">
              <p className="text-gray600 text-sm leading-relaxed whitespace-pre-wrap">
                {data.message}
              </p>
            </div>
          </div>

          <div className="border-gray200 rounded-lg border p-4">
            <h3 className="text-gray600 mb-3 flex items-center gap-2 text-sm font-medium">
              <Calendar className="size-4" />
              접수 정보
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray400 text-xs">접수일시</span>
                <span className="text-gray600 text-xs">
                  {formatDate(data.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray400 text-xs">경과시간</span>
                <span className="text-gray600 text-xs">
                  {formatRelativeTime(data.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-gray200 border-t p-6">
        <button
          onClick={handleDeleteContact}
          className="border-gray300 bg-background text-gray600 focus:ring-main hover:bg-gray100 w-full rounded-lg border px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          삭제
        </button>
      </footer>
    </section>
  );
}

export default ContactModal;
