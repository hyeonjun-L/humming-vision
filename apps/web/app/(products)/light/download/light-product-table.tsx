"use client";

import { TAKE } from "@/(products)/_constants/paginate.const";
import { LIGHT_CARD_FIELDS } from "@/(products)/_constants/products.const";
import {
  CategoriesEnum,
  GetLightQuery,
  GetProductResponse,
  LightProduct,
} from "@humming-vision/shared";
import { ColumnDef, Row } from "@tanstack/react-table";
import Pagination from "components/pagination";
import Table from "components/table";
import { useUpdateSearchParams } from "hooks/useUpdateSearchParams";
import { Ban, Download } from "lucide-react";
import Link from "next/link";
import LightCard from "./light-card";

interface LightProductTableProps {
  productsData: GetProductResponse<CategoriesEnum.LIGHT>;
  searchParams: GetLightQuery;
}

function LightProductTable({
  productsData,
  searchParams,
}: LightProductTableProps) {
  const { updateSearchParams } = useUpdateSearchParams();

  const columns: ColumnDef<LightProduct>[] = [
    ...LIGHT_CARD_FIELDS.map(({ label, accessor }) => ({
      header: label,
      accessorKey: label,
      cell: ({ row }: { row: Row<LightProduct> }) => accessor(row.original),
    })),
    {
      accessorKey: "download",
      header: "다운로드",
      cell: ({ row }) => {
        const product = row.original;
        const url = product.light.catalogUrl;
        return (
          <div className="flex items-center justify-center gap-1.5">
            {url ? (
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-main hover:bg-main/80 inline-flex items-center gap-1 rounded px-3 py-1 text-sm font-semibold text-white shadow transition-colors"
              >
                <Download className="size-4" />
                다운로드
              </Link>
            ) : (
              <span className="bg-gray100 text-gray400 border-gray200 inline-flex items-center gap-1 rounded border px-2 py-1 text-xs">
                <Ban className="size-3" />
                없음
              </span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="hidden md:block">
        <Table data={productsData.data} columns={columns} />
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:-ml-5 sm:grid-cols-2 md:hidden">
        {productsData.data.map((product) => (
          <LightCard key={product.id} product={product} />
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

export default LightProductTable;
