"use client";

import { LIGHT_CARD_FIELDS } from "@/(products)/_constants/products.const";
import { LightProduct } from "@humming-vision/shared";
import { Ban, Download } from "lucide-react";
import Link from "next/link";
import cn from "libs/cn";

type LightCardProps = {
  product: LightProduct;
};

function LightCard({ product }: LightCardProps) {
  const catalogUrl = product.light.catalogUrl;

  return (
    <li className="flex w-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
      {LIGHT_CARD_FIELDS.map(({ label, accessor }) => (
        <div className="mb-1 flex items-center gap-2.5" key={label}>
          <p
            className={cn("text-gray600 font-semibold whitespace-nowrap", {
              "text-gray600 text-sm": label === "등록일",
            })}
          >
            {label}
          </p>
          <p
            className={cn("text-gray600 grow truncate text-sm leading-snug", {
              "text-gray400": label === "등록일",
            })}
            title={String(accessor(product))}
          >
            {accessor(product)}
          </p>
        </div>
      ))}

      <div className="mt-2 text-right">
        {catalogUrl ? (
          <Link
            href={catalogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-main hover:bg-main/80 inline-flex items-center gap-1 rounded px-3 py-1.5 text-sm font-medium text-white shadow"
          >
            <Download className="size-4" />
            다운로드
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1 rounded border border-gray-300 bg-gray-100 px-2 py-1 text-xs text-gray-400">
            <Ban className="size-3" />
            없음
          </span>
        )}
      </div>
    </li>
  );
}

export default LightCard;
