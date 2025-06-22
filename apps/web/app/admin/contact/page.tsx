"use client";
import Table from "components/table";
import { Contact } from "@humming-vision/shared";
import { type ColumnDef } from "@tanstack/react-table";
import Pagination from "components/pagination";
import { useState } from "react";
import { SelectBox } from "components/select-box/select-box";
import { SearchInput } from "components/input";
import { useQuery } from "@tanstack/react-query";

// const data: Contact[] = [
//   {
//     id: 1,
//     name: "홍길동",
//     email: "Dasda@naver.com",
//     company: "홍길동 회사",
//     subject: "문의 제목",
//     message: "문의 내용입니다.",
//     isRead: false,
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: 2,
//     name: "김철수",
//     email: "sadasdasda@gmail.com",
//     company: "김철수 회사",
//     subject: "두번째 문의",
//     message: "두번째 문의 내용입니다.",
//     isRead: true,
//     createdAt: new Date().toISOString(),
//   },
// ];

function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("all");

  const getContacts = async (page: number) => {
    const response = await fetch(`/api/contact?page=${page}&take=5`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fetched contacts:", data);
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["contacts", currentPage],
    queryFn: () => getContacts(currentPage),
    // keepPreviousData: true, // 페이지 이동 시 flicker 방지
  });

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

  const selectOptions = [
    { value: "where__name__i_like", label: "이름" },
    { value: "where__email__i_like", label: "이메일" },
    { value: "where__subject__i_like", label: "제목" },
    { value: "where__company__i_like", label: "회사" },
  ];

  return (
    <main className="mx-auto mt-33 max-w-7xl">
      <hr className="border-gray200 absolute left-0 w-screen border-t" />
      <div className="border-main flex justify-between border-b py-5.5">
        <h2 className="text-main text-2xl font-bold">제품문의</h2>
        <div className="flex gap-5">
          <SelectBox
            options={selectOptions}
            selectLabel="filter"
            onValueChange={() => {}}
          />
          <SearchInput placeholder="검색어를 입력해주세요" />
        </div>
      </div>
      {/* {isLoading ? (
        <div className="flex justify-center py-10">로딩 중...</div>
      ) : (
        <Table data={data?.data || []} columns={columns} />
      )} */}
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
