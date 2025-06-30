"use client";
import { useState, useRef } from "react";
import { Upload, X, GripVertical, Trash2 } from "lucide-react";
import Image from "next/image";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );

    const newImages = maxImages
      ? [...images, ...files].slice(0, maxImages)
      : [...images, ...files];

    onImagesChange(newImages);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith("image/"),
    );

    const newImages = maxImages
      ? [...images, ...files].slice(0, maxImages)
      : [...images, ...files];

    onImagesChange(newImages);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", "");
  };

  const handleImageDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleImageDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(null);
  };

  const handleImageDrop = (e: React.DragEvent, dropIndex: number) => {
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
  };

  const handleImageDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

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
        <div
          className={`${canUploadMore ? "mt-4" : ""} grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4`}
        >
          {images.map((file, index) => (
            <div
              key={index}
              className={`group relative cursor-move ${
                draggedIndex === index ? "opacity-50" : ""
              } ${
                dragOverIndex === index ? "scale-105 ring-2 ring-blue-400" : ""
              }`}
              draggable
              onDragStart={(e) => handleImageDragStart(e, index)}
              onDragOver={(e) => handleImageDragOver(e, index)}
              onDragLeave={handleImageDragLeave}
              onDrop={(e) => handleImageDrop(e, index)}
              onDragEnd={handleImageDragEnd}
            >
              <div className="aspect-square overflow-hidden rounded-lg border-2 border-gray-200">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`업로드된 이미지 ${index + 1}`}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>

              <div className="bg-opacity-50 absolute top-2 left-2 rounded bg-black p-1 opacity-0 transition-opacity group-hover:opacity-100">
                <GripVertical className="h-4 w-4 text-white" />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage(index);
                }}
                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
              >
                <Trash2 className="size-5" />
              </button>
              <p className="text-gray500 mt-1 truncate text-xs">{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
