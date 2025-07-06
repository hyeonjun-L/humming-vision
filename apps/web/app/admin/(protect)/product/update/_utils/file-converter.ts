// URL에서 파일명을 추출하는 함수
export function getFileNameFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.split("/").pop() || "file";
    return filename;
  } catch {
    return "file";
  }
}

// URL을 File 객체로 변환하는 함수 (미리보기용)
export async function urlToFile(url: string, filename?: string): Promise<File> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const finalFilename = filename || getFileNameFromUrl(url);

    // MIME 타입 추론
    let mimeType = blob.type;
    if (!mimeType) {
      if (finalFilename.toLowerCase().endsWith(".pdf")) {
        mimeType = "application/pdf";
      } else if (finalFilename.toLowerCase().match(/\.(jpg|jpeg)$/)) {
        mimeType = "image/jpeg";
      } else if (finalFilename.toLowerCase().endsWith(".png")) {
        mimeType = "image/png";
      }
    }

    return new File([blob], finalFilename, {
      type: mimeType,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Failed to convert URL to File:", error);
    // 빈 파일 반환
    return new File([], filename || getFileNameFromUrl(url), {
      type: "application/octet-stream",
    });
  }
}

// 여러 URL을 File 배열로 변환
export async function urlsToFiles(urls: string[]): Promise<File[]> {
  try {
    const filePromises = urls.map((url) => urlToFile(url));
    return await Promise.all(filePromises);
  } catch (error) {
    console.error("Failed to convert URLs to Files:", error);
    return [];
  }
}
