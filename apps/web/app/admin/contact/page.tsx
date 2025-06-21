"use client";
import Table from "components/table";
import { Contact } from "@humming-vision/shared";
import { type ColumnDef } from "@tanstack/react-table";
import Pagination from "components/pagination";
import { useState } from "react";
import { SelectBox } from "components/select-box/select-box";

function Page() {
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
              className="bg-main px-4 py-1 text-white"
              onClick={() => alert(`읽기: ${contact.id}`)}
            >
              상세
            </button>
            <button
              className="bg-gray300 px-4 py-1 text-white"
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

  const selectOptions = [
    { value: "all", label: "전체" },
    { value: "unread", label: "읽지 않음" },
    { value: "read", label: "읽음" },
    { value: "deleted", label: "삭제됨" },
  ];

  return (
    <main className="mx-auto mt-33 max-w-7xl">
      <hr className="border-gray200 absolute left-0 w-screen border-t" />
      <div className="border-main flex justify-between border-b py-5.5">
        <h2 className="text-main text-2xl font-bold">제품문의</h2>
        <div className="gap-5">
          <SelectBox
            options={selectOptions}
            selectLabel="filter"
            onValueChange={() => {}}
          />
        </div>
      </div>
      <Table data={data} columns={columns} />
      <div className="mt-8 flex w-full justify-center">
        <Pagination
          currentPage={currentPage}
          take={5}
          total={40}
          onPageChange={(page: number) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </main>
  );
}

export default Page;
