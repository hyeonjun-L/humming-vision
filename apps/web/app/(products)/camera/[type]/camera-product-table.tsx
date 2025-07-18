"use client";

import {
  CameraProduct,
  CategoriesEnum,
  CategoryRelationMapKebab,
  GetCameraQuery,
  GetCameraResponse,
  GetProductResponse,
  GetProductResponseByCategory,
} from "@humming-vision/shared";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import Table from "components/table";
import Image from "next/image";

interface CameraProductTableProps {
  initCameraData: GetProductResponse<CategoriesEnum.CAMERA>;
  searchParams: GetCameraQuery;
}

function CameraProductTable({
  initCameraData,
  searchParams,
}: CameraProductTableProps) {
  console.log("initCameraData", initCameraData);

  if (!initCameraData) {
    return <div>Loading...</div>;
  }

  const { data: productsData, isLoading } = useQuery<
    GetProductResponse<CategoriesEnum.CAMERA>
  >({
    queryKey: ["products", searchParams],
    queryFn: async () => {
      const url = new URL(`/product/camera`);
      for (const [key, value] of Object.entries(searchParams)) {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            url.searchParams.append(key, value.join(","));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      }

      const res = await axios.get<GetProductResponse<CategoriesEnum.CAMERA>>(
        url.toString(),
        {
          adapter: "fetch",
        },
      );
      return res.data;
    },
    initialData: initCameraData,
  });

  const columns: ColumnDef<CameraProduct>[] = [
    {
      accessorKey: "info",
      header: "제조사/모델명",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex items-center gap-2">
            {/* <div className="relative mx-auto aspect-[64/54] w-[64px]">
                            <Image
                              src={product.images[0].path}
                              alt={product.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
            </div>
            <span className="text-sm font-semibold">{product.manufacturer}</span>
            <span className="text-sm text-gray-500">{product.model}</span> */}
          </div>
        );
      },
    },
    {
      accessorKey: "image",
      header: "이미지",
      cell: ({ row }) => {
        const product = row.original;
        return (
          <>
            <div className="relative mx-auto aspect-[80/54] w-[80px]"></div>
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
        return <div className="flex justify-center gap-2"></div>;
      },
    },
  ];

  return <Table data={[]} columns={columns} />;
}

export default CameraProductTable;
