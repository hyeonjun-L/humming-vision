import cn from "libs/cn";
import { GripVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import { memo, useCallback, useMemo } from "react";

export type ViewMode = "grid" | "list";

const ImageItem = memo(
  ({
    file,
    index,
    isDragged,
    isDraggedOver,
    viewMode,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    onRemove,
  }: {
    file: File;
    index: number;
    isDragged: boolean;
    isDraggedOver: boolean;
    viewMode: ViewMode;
    onDragStart: (e: React.DragEvent, index: number) => void;
    onDragOver: (e: React.DragEvent, index: number) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent, index: number) => void;
    onDragEnd: () => void;
    onRemove: (index: number) => void;
  }) => {
    const imageUrl = useMemo(() => URL.createObjectURL(file), [file]);

    const handleRemoveClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove(index);
      },
      [index, onRemove],
    );

    if (viewMode === "grid") {
      return (
        <div
          className={cn(
            "group relative cursor-move transition-all",
            isDragged && "opacity-50",
            isDraggedOver && "scale-105 ring-2 ring-blue-400",
          )}
          draggable
          onDragStart={(e) => onDragStart(e, index)}
          onDragOver={(e) => onDragOver(e, index)}
          onDragLeave={onDragLeave}
          onDrop={(e) => onDrop(e, index)}
          onDragEnd={onDragEnd}
        >
          <div className="border-gray200 aspect-square overflow-hidden rounded-lg border-2">
            <Image
              src={imageUrl}
              alt={`업로드된 이미지 ${index + 1}`}
              width={200}
              height={200}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>

          <div className="bg-opacity-50 absolute top-2 left-2 rounded bg-black p-1 opacity-0 transition-opacity group-hover:opacity-100">
            <GripVertical className="size-4 text-white" />
          </div>

          <button
            onClick={handleRemoveClick}
            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
          >
            <Trash2 className="size-5" />
          </button>
          <p className="text-gray500 mt-1 truncate text-xs">{file.name}</p>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "group relative cursor-move transition-all",
          "flex items-center space-x-4 rounded-lg border border-gray-200 p-3",
          isDragged && "opacity-50",
          isDraggedOver && "bg-blue-50 ring-2 ring-blue-400",
        )}
        draggable
        onDragStart={(e) => onDragStart(e, index)}
        onDragOver={(e) => onDragOver(e, index)}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e, index)}
        onDragEnd={onDragEnd}
      >
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
          <Image
            src={imageUrl}
            alt={`업로드된 이미지 ${index + 1}`}
            width={64}
            height={64}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-gray900 truncate text-sm font-medium">
            {file.name}
          </p>
          <p className="text-gray500 text-xs">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>

        <div className="flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>

        <button
          onClick={handleRemoveClick}
          className="flex-shrink-0 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    );
  },
);

ImageItem.displayName = "ImageItem";

export default ImageItem;
