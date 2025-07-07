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

    // 파일 크기 체크 (10MB 제한)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (blob.size > maxSize) {
      throw new Error(
        `File too large: ${(blob.size / 1024 / 1024).toFixed(2)}MB (max 10MB)`,
      );
    }

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

    // 에러 타입에 따른 적절한 처리
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(`파일 로드 시간 초과: ${url}`);
      } else if (error.message.includes("File too large")) {
        throw error; // 크기 에러는 그대로 전파
      } else {
        throw new Error(`파일 로드 실패: ${error.message}`);
      }
    }

    throw new Error(`알 수 없는 오류로 파일 로드 실패: ${url}`);
  }
}

// 여러 URL을 File 배열로 변환 (병렬 처리 + 에러 처리)
export async function urlsToFiles(urls: string[]): Promise<File[]> {
  if (!urls || urls.length === 0) {
    return [];
  }

  try {
    console.log(`Converting ${urls.length} URLs to files...`);

    // Promise.allSettled를 사용하여 일부 실패해도 다른 파일들은 로드되도록 함
    const results = await Promise.allSettled(
      urls.map(async (url, index) => {
        try {
          console.log(`Loading file ${index + 1}/${urls.length}: ${url}`);
          const file = await urlToFile(url);
          console.log(
            `✅ Successfully loaded: ${file.name} (${(file.size / 1024).toFixed(1)}KB)`,
          );
          return file;
        } catch (error) {
          console.error(`❌ Failed to load file from ${url}:`, error);
          throw error;
        }
      }),
    );

    // 성공한 파일들만 반환
    const successfulFiles = results
      .filter(
        (result): result is PromiseFulfilledResult<File> =>
          result.status === "fulfilled",
      )
      .map((result) => result.value);

    // 실패한 파일들 로그
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
