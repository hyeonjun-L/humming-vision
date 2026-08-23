import { LensType, LensTypeEnum } from "@humming-vision/shared";
import { usePathname } from "next/navigation";

/**
 * 렌즈 라우트(`/lens/[type]`)의 현재 렌즈 타입을 반환한다.
 * 렌즈 페이지가 아니거나 알 수 없는 타입이면 undefined.
 *
 * TCL은 CCTV와 스펙 체계가 달라(focalLength=배율, resolution=WD)
 * 필터 구성과 라벨을 타입별로 분기해야 한다.
 */
export function useLensType(): LensType | undefined {
  const pathname = usePathname();

  const segment = pathname.split("/")[2]?.toUpperCase();

  return segment === LensTypeEnum.CCTV || segment === LensTypeEnum.TCL
    ? segment
    : undefined;
}
