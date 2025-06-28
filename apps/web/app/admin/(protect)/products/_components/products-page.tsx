"use client";
import Table from "components/table";
import {
  CategoryRelationMapKebab,
  GetProductResponseByCategory,
  Product,
} from "@humming-vision/shared";
import { type ColumnDef } from "@tanstack/react-table";
import Pagination from "components/pagination";
import { useState } from "react";
import { SearchInput } from "components/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { publicApi } from "libs/axios";
import { Box } from "lucide-react";
import Image from "next/image";
import { SelectBox } from "components/select-box/select-box";

async function getProductsForCategory<C extends CategoryRelationMapKebab>(
  category: C,
  page: number,
  take: number,
  searchValue: string,
): Promise<GetProductResponseByCategory<C>> {
  const params = {
    page,
    take,
    order__id: "DESC",
    category,
    where__name__i_like: searchValue.trim() || "",
  };

  return publicApi
    .get<GetProductResponseByCategory<C>>(`/api/products`, { params })
    .then((response) => response.data);
}

function ProductsPage() {
  const TAKE = 12;

  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [activeSearchValue, setActiveSearchValue] = useState<string>("");
  const [searchField, setSearchField] = useState<CategoryRelationMapKebab>(
    CategoryRelationMapKebab.CAMERA,
  );

  const handleSearch = (value: string) => {
    setActiveSearchValue(value);
    setCurrentPage(1);
  };

  const { data: productsData, isLoading } = useQuery({
    queryKey: ["products", currentPage, activeSearchValue, searchField],
    queryFn: () =>
      getProductsForCategory(searchField, currentPage, TAKE, activeSearchValue),
  });

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "NO",
    },
    {
      accessorKey: "image",
      header: "이미지",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <>
            {product.images[0]?.path ? (
              <Image
                src={product.images[0].path}
                alt={product.name}
                width={80}
                height={54}
                className="mx-auto"
              />
            ) : (
              <Box className="text-gray300 mx-auto size-10" />
            )}
          </>
        );
      },
    },
    {
      accessorKey: "name",
      header: "상품명",
    },
    {
      accessorKey: "management",
      header: "관리",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex justify-center gap-2">
            <button
              className="bg-main px-4 py-1 whitespace-nowrap text-white"
              // onClick={() => handleContactModalOpen(contact)}
            >
              상세
            </button>
            <button
              className="bg-gray300 px-4 py-1 whitespace-nowrap text-white"
              // onClick={() => handleDeleteContact(contact.id)}
            >
              삭제
            </button>
          </div>
        );
      },
    },
  ];

  const selectOptions = [
    { value: CategoryRelationMapKebab.CAMERA, label: "카메라" },
    { value: CategoryRelationMapKebab.FRAMEGRABBER, label: "프레임 그래버" },
    { value: CategoryRelationMapKebab.LENS, label: "렌즈" },
    { value: CategoryRelationMapKebab.LIGHT, label: "조명" },
    { value: CategoryRelationMapKebab.SOFTWARE, label: "소프트웨어" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-0 md:px-10">
      <hr className="border-gray200 absolute left-0 w-screen border-t" />
      <div className="border-main flex flex-wrap justify-between gap-5 border-b py-5.5 sm:gap-0">
        <h2 className="text-main text-2xl font-bold">제품관리</h2>
        <div className="flex gap-5">
          <SelectBox
            options={selectOptions}
            selectLabel="검색 필드"
            defaultValue={searchField}
            onValueChange={(value) =>
              setSearchField(value as CategoryRelationMapKebab)
            }
          />
          <SearchInput
            placeholder="검색어를 입력해주세요"
            className="sm:w-[309px]"
            onSubmit={handleSearch}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-10">로딩 중...</div>
      ) : productsData?.data && productsData?.data.length > 0 ? (
        <>
          <Table data={productsData?.data || []} columns={columns} />
          <ul className="mt-5 flex flex-col gap-2.5 sm:hidden"></ul>

          <div className="mt-8 flex w-full justify-center">
            <Pagination
              currentPage={currentPage}
              take={TAKE}
              total={productsData?.total || 0}
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
