"use client";

import { TAKE } from "@/(products)/_constants/paginate.const";
import {
  CategoriesEnum,
  GetProductResponse,
  GetSoftwareQuery,
} from "@humming-vision/shared";
import Pagination from "components/pagination";
import { useUpdateSearchParams } from "hooks/useUpdateSearchParams";
import { Image as LucideImage } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import getRepresentativeImage from "utils/get-representative-image";

interface SoftwareProductTableProps {
  productsData: GetProductResponse<CategoriesEnum.SOFTWARE>;
  searchParams: GetSoftwareQuery;
}

function SoftwareProductTable({
  productsData,
  searchParams,
}: SoftwareProductTableProps) {
  const { updateSearchParams } = useUpdateSearchParams();

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-6 py-10 sm:grid-cols-3 lg:grid-cols-4">
        {productsData.data.map((product) => {
          const representativeImage = getRepresentativeImage(product.images);

          return (
            <li key={product.id}>
              <Link
                className="flex size-full flex-col items-center gap-2.5"
                href={`/software/${product.software.maker.toLocaleLowerCase()}/${product.id}`}
              >
                {representativeImage?.path ? (
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={representativeImage.path}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="rounded-md object-cover"
                    />
                  </div>
                ) : (
                  <div className="bg-gray100 flex aspect-[4/3] w-full items-center justify-center rounded-md">
                    <LucideImage className="text-gray300 h-1/2 w-1/2" />
                  </div>
                )}
                <p className="text-gray600 text-center text-sm">
                  {product.name}
                </p>
              </Link>
            </li>
          );
        })}
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

export default SoftwareProductTable;
