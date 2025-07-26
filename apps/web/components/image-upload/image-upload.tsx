"use client";
import { useState, useRef, useCallback } from "react";
import { Upload, Grid3X3, List } from "lucide-react";
import cn from "libs/cn";
import ImageItem, { ViewMode } from "./image-item";

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
  className?: string;
}

function ImageUpload({
  images,
  onImagesChange,
  maxImages,
  className = "",
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/"),
      );

      const newImages = maxImages
        ? [...images, ...files].slice(0, maxImages)
        : [...images, ...files];

      onImagesChange(newImages);
    },
    [images, maxImages, onImagesChange],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []).filter((file) =>
        file.type.startsWith("image/"),
      );

      const newImages = maxImages
        ? [...images, ...files].slice(0, maxImages)
        : [...images, ...files];

      onImagesChange(newImages);
    },
    [images, maxImages, onImagesChange],
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
    },
    [images, onImagesChange],
  );

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageDragStart = useCallback(
    (e: React.DragEvent, index: number) => {
      setDraggedIndex(index);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", "");
    },
    [],
  );

  const handleImageDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverIndex(index);
    },
    [],
  );

  const handleImageDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(null);
  }, []);

  const handleImageDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      setDragOverIndex(null);

      if (draggedIndex === null || draggedIndex === dropIndex) {
        setDraggedIndex(null);
        return;
      }

      const newImages = [...images];
      const draggedImage = newImages[draggedIndex];

      if (!draggedImage) {
        setDraggedIndex(null);
        return;
      }

      newImages.splice(draggedIndex, 1);
      newImages.splice(dropIndex, 0, draggedImage);

      onImagesChange(newImages);
      setDraggedIndex(null);
    },
    [draggedIndex, images, onImagesChange],
  );

  const handleImageDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, []);

  const canUploadMore = !maxImages || images.length < maxImages;

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {canUploadMore && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
          className={`group cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            isDragOver
              ? "border-main bg-gray100"
              : "border-gray200 hover:border-gray300"
          } `}
        >
          <Upload className="group-hover:text-gray600 text-gray400 mx-auto mb-4 size-12" />
          <p className="text-gray600 mb-2 text-base font-medium">
            이미지를 드래그하여 업로드하거나 클릭하세요
          </p>
          <p className="text-gray400 text-sm">
            PNG, JPG, GIF 등의 이미지 파일을 지원합니다
            {maxImages && ` (최대 ${maxImages}개)`}
          </p>
        </div>
      )}

      {images.length > 0 && (
        <div className={canUploadMore ? "mt-4" : ""}>
          {/* 뷰 모드 선택 버튼 */}
          <div className="mb-3 flex justify-end">
            <div className="flex rounded-md border border-gray-200 bg-white">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center rounded-l-md px-3 py-1.5 text-sm font-medium transition-colors",
                  viewMode === "grid"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                <Grid3X3 className="mr-1.5 size-4" />
                그리드
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex items-center rounded-r-md px-3 py-1.5 text-sm font-medium transition-colors",
                  viewMode === "list"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                <List className="mr-1.5 size-4" />
                목록
              </button>
            </div>
          </div>

          {viewMode === "grid" && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((file, index) => (
                <ImageItem
                  key={`${file.name}-${file.size}-${index}`}
                  file={file}
                  index={index}
                  isDragged={draggedIndex === index}
                  isDraggedOver={dragOverIndex === index}
                  viewMode="grid"
                  onDragStart={handleImageDragStart}
                  onDragOver={handleImageDragOver}
                  onDragLeave={handleImageDragLeave}
                  onDrop={handleImageDrop}
                  onDragEnd={handleImageDragEnd}
                  onRemove={handleRemoveImage}
                />
              ))}
            </div>
          )}

          {viewMode === "list" && (
            <div className="space-y-3">
              {images.map((file, index) => (
                <ImageItem
                  key={`${file.name}-${file.size}-${index}`}
                  file={file}
                  index={index}
                  isDragged={draggedIndex === index}
                  isDraggedOver={dragOverIndex === index}
                  viewMode="list"
                  onDragStart={handleImageDragStart}
                  onDragOver={handleImageDragOver}
                  onDragLeave={handleImageDragLeave}
                  onDrop={handleImageDrop}
                  onDragEnd={handleImageDragEnd}
                  onRemove={handleRemoveImage}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
