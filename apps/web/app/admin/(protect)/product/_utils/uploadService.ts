import { protectApi } from "libs/axios";

export interface UploadService {
  uploadImages: (images: File[]) => Promise<string[]>;
  uploadDocument: (file: File) => Promise<string>;
}

export const createUploadService = (): UploadService => {
  const uploadImages = async (images: File[]): Promise<string[]> => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("files", image);
    });
    const response = await protectApi.post<string[]>(
      "/api/uploads/images",
      formData,
    );
    return response.data.map((url: string) => url);
  };

  const uploadDocument = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await protectApi.post("/api/uploads/documents", formData);
    return response.data.url;
  };

  return {
    uploadImages,
    uploadDocument,
  };
};

// 이미지 데이터 변환 유틸리티
export const createImageData = (
  urls: string[],
  type: "PRODUCT" | "SPEC",
): Array<{
  order: number;
  type: "PRODUCT" | "SPEC";
  path: string;
}> => {
  return urls.map((path: string, index: number) => ({
    order: index,
    type,
    path,
  }));
};
