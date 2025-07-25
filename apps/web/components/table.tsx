"use client"; // Next.js 서버 컴포넌트라면 이 선언 필요

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import cn from "libs/cn";
import { usePathname, useRouter } from "next/navigation";

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  isProductsTable?: boolean;
};

export default function Table<T>({
  data,
  columns,
  isProductsTable,
}: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="border-main overflow-x-auto border-t">
      <table className="min-w-full table-fixed">
        <thead className="border-gray200 border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-gray600 p-2 py-2.5 text-base font-normal whitespace-nowrap"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const rowData = row.original as Record<string, unknown>;
            const isRead = rowData?.isRead === true;

            return (
              <tr
                key={row.id}
                className={cn("text-gray600", {
                  "bg-gray100 text-gray400": isRead,
                  "cursor-pointer": isProductsTable,
                })}
                tabIndex={isProductsTable ? 0 : -1}
                role={isProductsTable ? "button" : undefined}
                onClick={() => {
                  if (!isProductsTable) return;
                  router.push(`${pathname}/${rowData.id}`);
                }}
                onKeyDown={(e) => {
                  if (!isProductsTable) return;

                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(`${pathname}/${rowData.id}`);
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-gray200 border-b p-2 py-3.5 text-center text-sm font-normal"
                  >
                    <div className="mx-auto max-w-xs truncate">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
