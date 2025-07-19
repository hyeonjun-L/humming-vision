"use client";

import { TAKE } from "@/(products)/_constants/paginate.const";
import {
  CameraProduct,
  CategoriesEnum,
  GetCameraQuery,
  GetProductResponse,
} from "@humming-vision/shared";
import { ColumnDef } from "@tanstack/react-table";
import Pagination from "components/pagination";
import Table from "components/table";
import { useUpdateSearchParams } from "hooks/useUpdateSearchParams";
import { Box } from "lucide-react";
import Image from "next/image";

interface CameraProductTableProps {
  productsData: GetProductResponse<CategoriesEnum.CAMERA>;
  searchParams: GetCameraQuery;
}

function CameraProductTable({
  productsData,
  searchParams,
}: CameraProductTableProps) {
  const { updateSearchParams } = useUpdateSearchParams();

  const columns: ColumnDef<CameraProduct>[] = [
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
                {product.camera.maker.charAt(0) +
                  product.camera.maker.slice(1).toLowerCase()}
              </span>
              <span className="text-gray600 mr-auto">{product.name}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "resolution",
      header: "해상도",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <p className="text-gray600">
            {`${product.camera.resolutionX} x ${product.camera.resolutionY}`}
          </p>
        );
      },
    },
    {
      accessorKey: "speed",
      header: "속도",
      cell: ({ row }) => {
        const product = row.original;
        return <p className="text-gray600">{product.camera.speed}fps</p>;
      },
    },
    {
      accessorKey: "pixelSize",
      header: "픽셀사이즈",
      cell: ({ row }) => {
        const product = row.original;
        return <p className="text-gray600">{product.camera.pixelSize}um</p>;
      },
    },
    {
      accessorKey: "formatSize",
      header: "포멧사이즈",
      cell: ({ row }) => {
        const product = row.original;
        return <p className="text-gray600">{product.camera.formatSize}</p>;
      },
    },
    {
      accessorKey: "mountType",
      header: "마운트",
      cell: ({ row }) => {
        const product = row.original;
        return <p className="text-gray600">{product.camera.mountType}</p>;
      },
    },
    {
      accessorKey: "sensor",
      header: "센서",
      cell: ({ row }) => {
        const product = row.original;
        return <p className="text-gray600">{product.camera.sensor}</p>;
      },
    },
    {
      accessorKey: "interface",
      header: "인터페이스",
      cell: ({ row }) => {
        const product = row.original;
        return <p className="text-gray600">{product.camera.interface}</p>;
      },
    },
  ];

  return (
    <>
      <Table data={productsData.data} columns={columns} />
      <div className="mt-8 flex w-full justify-center">
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

export default CameraProductTable;
