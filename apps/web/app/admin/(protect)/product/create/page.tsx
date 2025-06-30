"use client";
import { CategoryRelationMapKebab } from "@humming-vision/shared";
import { Input } from "components/input";
import { SelectBox } from "components/select-box/select-box";
import { useState } from "react";
import ImageUpload from "components/image-upload/image-upload";
import PdfUpload from "components/pdf-upload";
import { ArrowRight } from "lucide-react";

function CreateProductPage() {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [specImages, setSpecImages] = useState<File[]>([]);
  const [datasheetFile, setDatasheetFile] = useState<File | null>(null);
  const [drawingFile, setDrawingFile] = useState<File | null>(null);
  const [manualFile, setManualFile] = useState<File | null>(null);

  const selectOptions = [
    { value: CategoryRelationMapKebab.CAMERA, label: "카메라" },
    { value: CategoryRelationMapKebab.FRAMEGRABBER, label: "프레임 그래버" },
    { value: CategoryRelationMapKebab.LENS, label: "렌즈" },
    { value: CategoryRelationMapKebab.LIGHT, label: "조명" },
    { value: CategoryRelationMapKebab.SOFTWARE, label: "소프트웨어" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-60 md:px-10">
      <hr className="border-gray200 absolute left-0 w-screen border-t" />
      <div className="border-main mb-5 border-b py-5.5 sm:gap-0">
        <h2 className="text-main text-2xl font-bold">제품등록</h2>
      </div>
      <section className="border-gray200 mb-3.5 flex flex-col gap-5 border p-[30px]">
        <h3 className="text-gray600 text-xl font-semibold">분류설정</h3>
        <div className="flex w-full gap-10">
          <div className="flex w-1/2 flex-col gap-2">
            <label className="text-gray400 font-semibold">제품선택</label>
            <SelectBox
              options={selectOptions}
              onValueChange={() => {}}
              size="full"
            />
          </div>
          <div className="flex w-1/2 flex-col gap-2">
            <label className="text-gray400 font-semibold">카테고리 선택</label>
            <SelectBox
              options={selectOptions}
              onValueChange={() => {}}
              size="full"
            />
          </div>
        </div>
      </section>
      <section className="border-gray200 mb-3.5 flex flex-col gap-10 border p-[30px]">
        <h3 className="text-gray600 text-xl font-semibold">정보</h3>
        <div className="flex w-full flex-col gap-2">
          <label className="text-gray400 font-semibold">제품명</label>
          <Input
            size="default"
            placeholder="제품명 입력"
            className="text-gray600 focus-visible:border-gray200 rounded-none border-x-0 border-t-0 border-b text-base outline-none placeholder:text-sm focus-visible:ring-0"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label className="text-gray400 font-semibold">주요특징</label>
          <textarea
            placeholder="주요특징 입력"
            className="text-gray600 placeholder:text-gray300 field-sizing-content max-h-[11.25rem] resize-none rounded-none border-x-0 border-t-0 border-b px-3 py-1 outline-none placeholder:text-sm focus-visible:ring-0"
          />
        </div>{" "}
        <div className="flex w-full flex-col gap-2">
          <label className="text-gray400 font-semibold">이미지</label>
          <ImageUpload
            images={productImages}
            onImagesChange={setProductImages}
            maxImages={10}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label className="text-gray400 font-semibold">Datasheet (PDF)</label>
          <PdfUpload file={datasheetFile} onFileChange={setDatasheetFile} />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label className="text-gray400 font-semibold">Drawing (PDF)</label>
          <PdfUpload file={drawingFile} onFileChange={setDrawingFile} />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label className="text-gray400 font-semibold">Manual (PDF)</label>
          <PdfUpload file={manualFile} onFileChange={setManualFile} />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label className="text-gray400 font-semibold">제조사</label>
          <Input
            size="default"
            placeholder="제조사 입력"
            className="text-gray600 focus-visible:border-gray200 rounded-none border-x-0 border-t-0 border-b text-base outline-none placeholder:text-sm focus-visible:ring-0"
          />
        </div>
      </section>
      <section className="border-gray200 mb-3.5 flex flex-col gap-10 border p-[30px]">
        <h3 className="text-gray600 text-xl font-semibold">상세스펙</h3>
        <ImageUpload images={specImages} onImagesChange={setSpecImages} />
      </section>
      <section className="border-gray200 mb-3.5 flex flex-col gap-10 border p-[30px]">
        <h3 className="text-gray600 text-xl font-semibold">기타정보</h3>
        <div className="flex gap-5">
          <div className="flex w-full flex-col gap-2">
            <label className="text-gray400 font-semibold">제품코드</label>
            <Input
              size="default"
              placeholder="제품코드 입력"
              className="text-gray600 focus-visible:border-gray200 rounded-none text-base outline-none placeholder:text-sm focus-visible:ring-0"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-gray400 font-semibold">제품코드</label>
            <Input
              size="default"
              placeholder="제품코드 입력"
              className="text-gray600 focus-visible:border-gray200 rounded-none text-base outline-none placeholder:text-sm focus-visible:ring-0"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-gray400 font-semibold">제품코드</label>
            <Input
              size="default"
              placeholder="제품코드 입력"
              className="text-gray600 focus-visible:border-gray200 rounded-none text-base outline-none placeholder:text-sm focus-visible:ring-0"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-gray400 font-semibold">제품코드</label>
            <SelectBox
              options={selectOptions}
              onValueChange={() => {}}
              size="full"
            />
          </div>
        </div>
      </section>
      <button className="group border-gray300 ml-auto flex w-64 border-b py-2.5 transition-colors">
        <div className="text-gray300 flex w-full items-center justify-end gap-5 text-xl font-normal group-hover:font-semibold">
          등록하기
          <div className="border-gray300 group-hover:bg-gray100 flex size-9 items-center justify-center rounded-full border bg-white">
            <ArrowRight className="text-gray300" />
          </div>
        </div>
      </button>
    </main>
  );
}

export default CreateProductPage;
