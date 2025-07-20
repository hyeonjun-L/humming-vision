"use client";

import ProductCard from "@/(products)/_components/product-card";
import { TAKE } from "@/(products)/_constants/paginate.const";
import { LENS_CARD_FIELDS } from "@/(products)/_constants/products.const";
import {
  CategoriesEnum,
  GetLensQuery,
  GetProductResponse,
  LensProduct,
} from "@humming-vision/shared";
import { ColumnDef, Row } from "@tanstack/react-table";
import Pagination from "components/pagination";
import Table from "components/table";
import { useUpdateSearchParams } from "hooks/useUpdateSearchParams";
import { Box } from "lucide-react";
import Image from "next/image";

interface LensProductTableProps {
  productsData: GetProductResponse<CategoriesEnum.LENS>;
  searchParams: GetLensQuery;
}

function LensProductTable({
  productsData,
  searchParams,
}: LensProductTableProps) {
  const { updateSearchParams } = useUpdateSearchParams();

  const columns: ColumnDef<LensProduct>[] = [
    {
      accessorKey: "info",
      header: "제조사/모델명",
      cell: ({ row }) => {
        const product = row.original;

        const representativeImage = product.images
          .filter((img) => img.type === "PRODUCT")
          .reduce<null | (typeof product.images)[0]>((prev, curr) => {
            if (!prev || curr.order < prev.order) return curr;
            return prev;
          }, null);

        return (
          <div className="flex items-center gap-1.5">
            {representativeImage?.path ? (
              <div className="relative aspect-[64/54] w-[64px]">
                <Image
                  src={representativeImage.path}
                  alt={product.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            ) : (
              <Box className="text-gray300 aspect-[64/54] h-14 w-[64px]" />
            )}
            <div className="flex flex-col">
              <span className="text-gray400 mr-auto text-sm">
                {product.lens.maker.charAt(0) +
                  product.lens.maker.slice(1).toLowerCase()}
              </span>
              <span className="text-gray600 mr-auto">{product.name}</span>
            </div>
          </div>
        );
      },
    },
    ...LENS_CARD_FIELDS.map(({ label, accessor }) => ({
      header: label,
      accessorKey: label,
      cell: ({ row }: { row: Row<LensProduct> }) => (
        <p className="text-gray600">{accessor(row.original)}</p>
      ),
    })),
  ];

  return (
    <>
      <div className="hidden lg:block">
        <Table data={productsData.data} columns={columns} />
      </div>
      <ul className="flex flex-wrap gap-x-3 gap-y-10 py-10 lg:hidden">
        {productsData.data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            productFields={LENS_CARD_FIELDS}
          />
        ))}
      </ul>
      <div className="my-8 flex w-full justify-center">
        <Pagination
          currentPage={Number(searchParams.page) || 1}
          take={TAKE}
          total={productsData?.total || 0}
          onPageChange={(page: number) => {
            updateSearchParams("page", String(page));
          }}
        />
      </div>
    </>
  );
}

export default LensProductTable;
