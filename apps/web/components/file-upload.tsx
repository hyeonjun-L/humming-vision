"use client";
import { useState, useRef } from "react";
import { Upload, X, FileText } from "lucide-react";

interface UploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string[]; // 예: ['.pdf', '.dwg', '.stp']
  className?: string;
}

function FileUpload({
  file,
  onFileChange,
  className = "",
  accept = [".pdf"],
}: UploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedExtensions = accept.map((ext) => ext.toLowerCase());

  const isAcceptedFile = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    return acceptedExtensions.includes(`.${ext}`);
  };

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

    const files = Array.from(e.dataTransfer.files);
    const acceptedFile = files.find((file) => isAcceptedFile(file));
    if (acceptedFile) {
      onFileChange(acceptedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && isAcceptedFile(selectedFile)) {
      onFileChange(selectedFile);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveFile = () => {
    onFileChange(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept.join(",")}
        onChange={handleFileSelect}
        className="hidden"
      />

      {!file ? (
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
            파일을 드래그하여 업로드하거나 클릭하세요
          </p>
          <p className="text-gray400 text-sm">
            지원 형식: {accept.join(", ").replaceAll(".", "").toUpperCase()}{" "}
            (1개 파일)
          </p>
        </div>
      ) : (
        <div className="border-gray200 rounded-lg border-2 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <FileText className="text-main size-8" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-gray600 truncate text-sm font-medium">
                  {file.name}
                </p>
                <p className="text-gray500 text-sm">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="flex-shrink-0 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
