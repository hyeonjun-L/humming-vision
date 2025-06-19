"use client";
import Table from "components/table";
import { Contact } from "@humming-vision/shared";
import { type ColumnDef } from "@tanstack/react-table";

function page() {
  const columns: ColumnDef<Contact>[] = [
    {
      accessorKey: "id",
      header: "NO",
    },
    {
      accessorKey: "name",
      header: "이름",
    },
    {
      accessorKey: "subject",
      header: "제목",
    },
    {
      accessorKey: "email",
      header: "연락처",
    },
    {
      accessorKey: "createdAt",
      header: "등록일자",
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return date.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      accessorKey: "management",
      header: "관리",
      cell: ({ row }) => {
        const contact = row.original;
        return (
          <div className="flex justify-center gap-2">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => alert(`읽기: ${contact.id}`)}
            >
              읽기
            </button>
            <button
              className="text-red-500 hover:underline"
              onClick={() => alert(`삭제: ${contact.id}`)}
            >
              삭제
            </button>
          </div>
        );
      },
    },
  ];

  const data: Contact[] = [
    {
      id: 1,
      name: "홍길동",
      email: "Dasda@naver.com",
      company: "홍길동 회사",
      subject: "문의 제목",
      message: "문의 내용입니다.",
      isRead: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "김철수",
      email: "sadasdasda@gmail.com",
      company: "김철수 회사",
      subject: "두번째 문의",
      message: "두번째 문의 내용입니다.",
      isRead: true,
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <main className="mx-auto mt-44 max-w-7xl">
      <div className="border-main flex justify-between border-b">
        dsadas <p>dsadas</p>
      </div>
      <Table data={data} columns={columns} />
    </main>
  );
}

export default page;
