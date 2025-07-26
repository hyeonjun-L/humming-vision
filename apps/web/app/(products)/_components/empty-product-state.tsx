import RefreshButton from "components/products-filter/refresh-button";
import { RoutePath } from "consts/route.const";
import { Frown } from "lucide-react";
import Link from "next/link";

function EmptyProductState() {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center py-24 text-center">
      <Frown className="mb-4 h-12 w-12 text-gray-400" />
      <h3 className="text-lg font-semibold">제품이 존재하지 않습니다</h3>
      <p className="mt-2 text-sm">
        선택하신 조건에 해당하는 제품이 존재하지 않습니다.
      </p>
      <div className="flex w-2xs flex-col">
        <Link
          className="border-gray200 text-gray600 mt-5 flex h-11 w-full items-center justify-center border"
          href={`${RoutePath.CONTACT}`}
        >
          제품 문의
        </Link>
        <RefreshButton />
      </div>
    </div>
  );
}

export default EmptyProductState;
