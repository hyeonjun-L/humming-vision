import { imageSize } from "image-size";

const REVALIDATE_SECONDS = 60 * 60 * 24 * 30;

export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * 원격 이미지의 원본 치수를 읽는다.
 * 이미지 메타에 width/height가 없으면 next/image가 종횡비를 몰라
 * 공간을 미리 확보하지 못해 레이아웃이 밀린다(CLS).
 *
 * 서버 컴포넌트에서만 사용하며, 응답은 Next fetch 캐시에 올라가
 * 캐시 미스일 때만 실제 요청이 나간다.
 * 실패 시 null을 반환해 렌더링을 막지 않는다.
 */
export default async function getImageSize(
  url: string,
): Promise<ImageDimensions | null> {
  if (!url) return null;

  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return null;

    const { width, height } = imageSize(
      new Uint8Array(await response.arrayBuffer()),
    );

    if (!width || !height) return null;

    return { width, height };
  } catch {
    return null;
  }
}
