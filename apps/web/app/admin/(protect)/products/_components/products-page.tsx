"use client";
import Table from "components/table";
import {
  CategoriesEnum,
  Contact,
  GetContactResponse,
} from "@humming-vision/shared";
import { type ColumnDef } from "@tanstack/react-table";
import Pagination from "components/pagination";
import { useState } from "react";
import { SearchInput } from "components/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { publicApi } from "libs/axios";
import { Box } from "lucide-react";

function ProductsPage() {
  const TAKE = 12;

  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [activeSearchValue, setActiveSearchValue] = useState<string>("");
  const [searchField, setSearchField] = useState<CategoriesEnum>(
    CategoriesEnum.CAMERA,
  );

  // const handleDeleteContact = async (id: number) => {
  //   try {
  //     await publicApi.delete(`/api/contact/delete?id=${id}`);

  //     queryClient.setQueryData(
  //       ["contacts", currentPage, activeSearchValue],
  //       (oldData: GetContactResponse | undefined) => {
  //         if (!oldData) return oldData;
  //         return {
  //           ...oldData,
  //           data: oldData.data.filter((contact) => contact.id !== id),
  //           total: oldData.total - 1,
  //         };
  //       },
  //     );
  //   } catch (error) {
  //     console.error("Failed to delete contact:", error);
  //   }
  // };

  const getProducts = async (page: number) => {
    const params = {
      page,
      take: TAKE,
      order__createdAt: "DESC",

      where__name__i_like: "",
    };

    if (activeSearchValue.trim()) {
      params["where__name__i_like"] = activeSearchValue.trim();
    }

    const response = await publicApi.get<GetContactResponse>(`/api/contact`, {
      params,
    });

    return response.data;
  };

  const handleSearch = (value: string) => {
    setActiveSearchValue(value);
    setCurrentPage(1);
  };

  const { data: contactData, isLoading } = useQuery({
    queryKey: ["products", currentPage, activeSearchValue, searchField],
    queryFn: () => getProducts(currentPage),
  });

  const columns: ColumnDef<Contact>[] = [
    {
      accessorKey: "id",
      header: "NO",
    },
    {
      accessorKey: "image",
      header: "이미지",
      cell: ({ row }) => {
        const contact = row.original;
        return (
          <div className="flex justify-center">
            {contact.image ? (
              <img
                src={contact.image}
                alt={contact.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <Box className="text-gray300 size-10" />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "카테고리",
    },
    {
      accessorKey: "name",
      header: "상품명",
    },
    {
      accessorKey: "management",
      header: "관리",
      cell: ({ row }) => {
        const contact = row.original;
        return (
          <div className="flex justify-center gap-2">
            <button
              className="bg-main px-4 py-1 whitespace-nowrap text-white"
              onClick={() => handleContactModalOpen(contact)}
            >
              상세
            </button>
            <button
              className="bg-gray300 px-4 py-1 whitespace-nowrap text-white"
              onClick={() => handleDeleteContact(contact.id)}
            >
              삭제
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-0 md:px-10">
      <hr className="border-gray200 absolute left-0 w-screen border-t" />
      <div className="border-main flex flex-wrap justify-between gap-5 border-b py-5.5 sm:gap-0">
        <h2 className="text-main text-2xl font-bold">제품관리</h2>
        <SearchInput
          placeholder="검색어를 입력해주세요"
          className="sm:w-[309px]"
          onSubmit={handleSearch}
        />
      </div>
      {contactData?.data && contactData?.data.length > 0 ? (
        <>
          {isLoading ? (
            <div className="flex justify-center py-10">로딩 중...</div>
          ) : (
            <>
              <Table data={contactData?.data || []} columns={columns} />
              <ul className="mt-5 flex flex-col gap-2.5 sm:hidden"></ul>
            </>
          )}
          <div className="mt-8 flex w-full justify-center">
            <Pagination
              currentPage={currentPage}
              take={TAKE}
              total={contactData?.total || 0}
              onPageChange={(page: number) => {
                setCurrentPage(page);
              }}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-gray100 mb-6 flex size-20 items-center justify-center rounded-full">
            <Box className="text-gray300 size-10" />
          </div>
          <h3 className="text-gray600 mb-2 text-lg font-semibold">
            등록된 제품 없습니다
          </h3>
          <p className="text-gray400 text-center text-sm">
            아직 등록된 제품이 없습니다.
            <br />
            새로운 제품이 등록되면 여기에 표시됩니다.
          </p>
        </div>
      )}
    </main>
  );
}

export default ProductsPage;
