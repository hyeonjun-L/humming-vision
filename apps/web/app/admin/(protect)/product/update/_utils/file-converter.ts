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

export async function urlToFile(url: string, filename?: string): Promise<File> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const blob = await response.blob();

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (blob.size > maxSize) {
      throw new Error(
        `File too large: ${(blob.size / 1024 / 1024).toFixed(2)}MB (max 10MB)`,
      );
    }

    const finalFilename = filename || getFileNameFromUrl(url);

    let mimeType = blob.type;
    if (!mimeType) {
      if (finalFilename.toLowerCase().endsWith(".pdf")) {
        mimeType = "application/pdf";
      } else if (finalFilename.toLowerCase().match(/\.(jpg|jpeg)$/)) {
        mimeType = "image/jpeg";
      } else if (finalFilename.toLowerCase().endsWith(".png")) {
        mimeType = "image/png";
      } else if (finalFilename.toLowerCase().endsWith(".webp")) {
        mimeType = "image/webp";
      } else if (finalFilename.toLowerCase().endsWith(".gif")) {
        mimeType = "image/gif";
      }
    }

    return new File([blob], finalFilename, {
      type: mimeType,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Failed to convert URL to File:", error);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(`파일 로드 시간 초과: ${url}`);
      } else if (error.message.includes("File too large")) {
        throw error;
      } else {
        throw new Error(`파일 로드 실패: ${error.message}`);
      }
    }

    throw new Error(`알 수 없는 오류로 파일 로드 실패: ${url}`);
  }
}

export async function urlsToFiles(urls: string[]): Promise<File[]> {
  if (!urls || urls.length === 0) {
    return [];
  }

  try {
    const results = await Promise.allSettled(
      urls.map(async (url) => {
        try {
          const file = await urlToFile(url);
          return file;
        } catch (error) {
          console.error(`❌ Failed to load file from ${url}:`, error);
          throw error;
        }
      }),
    );

    const successfulFiles = results
      .filter(
        (result): result is PromiseFulfilledResult<File> =>
          result.status === "fulfilled",
      )
      .map((result) => result.value);

    const failedCount = results.length - successfulFiles.length;
    if (failedCount > 0) {
      console.warn(
        `${failedCount}개 파일 로드 실패, ${successfulFiles.length}개 파일 로드 성공`,
      );
    }

    return successfulFiles;
  } catch (error) {
    console.error("Failed to convert URLs to Files:", error);
    return [];
  }
}
