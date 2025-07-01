"use client";
import {
  CameraColorEnum,
  CameraInterfaceEnum,
  CameraMakerEnum,
  CameraTypeEnum,
  CategoryRelationMapKebab,
  FrameGrabberInterfaceEnum,
  FrameGrabberMakerEnum,
  LensMountEnum,
  LensTypeEnum,
  SoftwareMakerEnum,
} from "@humming-vision/shared";
import { Input } from "components/input";
import { SelectBox } from "components/select-box/select-box";
import { useState } from "react";
import ImageUpload from "components/image-upload/image-upload";
import PdfUpload from "components/pdf-upload";
import { ArrowRight } from "lucide-react";

type CategoryFieldOption = {
  label: string;
  type: "select" | "input";
  placeholder?: string;
  unit?: string;
  options?: { value: string; label: string }[];
};

type CategoryOptionsMap = {
  [key in CategoryRelationMapKebab]: CategoryFieldOption[];
};

const CategoryField = ({
  field,
  index,
}: {
  field: CategoryFieldOption;
  index: number;
}) => {
  const fieldId = `field-${index}`;

  return (
    <div
      key={fieldId}
      className="flex w-full flex-col gap-2 lg:w-[calc(50%-10px)]"
    >
      <label className="text-gray400 font-semibold">
        {field.label}
        {field.unit && (
          <span className="text-gray300 ml-1">({field.unit})</span>
        )}
      </label>

      {field.type === "select" ? (
        <SelectBox
          options={field.options || []}
          onValueChange={() => {}}
          size="full"
        />
      ) : (
        <Input
          size="default"
          placeholder={field.placeholder}
          className="text-gray600 border-gray200 focus-visible:border-gray200 rounded-none text-base outline-none placeholder:text-sm focus-visible:ring-0"
        />
      )}
    </div>
  );
};

function CreateProductPage() {
  const [selectProduct, setSelectProduct] = useState<CategoryRelationMapKebab>(
    CategoryRelationMapKebab.CAMERA,
  );
  const [productImages, setProductImages] = useState<File[]>([]);
  const [specImages, setSpecImages] = useState<File[]>([]);
  const [datasheetFile, setDatasheetFile] = useState<File | null>(null);
  const [drawingFile, setDrawingFile] = useState<File | null>(null);
  const [manualFile, setManualFile] = useState<File | null>(null);

  const selectProductOptions = [
    { value: CategoryRelationMapKebab.CAMERA, label: "카메라" },
    { value: CategoryRelationMapKebab.FRAMEGRABBER, label: "프레임 그래버" },
    { value: CategoryRelationMapKebab.LENS, label: "렌즈" },
    { value: CategoryRelationMapKebab.LIGHT, label: "조명" },
    { value: CategoryRelationMapKebab.SOFTWARE, label: "소프트웨어" },
  ];

  const selectCategoryOptions = {
    [CategoryRelationMapKebab.CAMERA]: [
      { value: CameraTypeEnum.AREA, label: "Area Scan" },
      { value: CameraTypeEnum.LINE, label: "Line Scan" },
    ],
    [CategoryRelationMapKebab.FRAMEGRABBER]: [
      {
        value: FrameGrabberInterfaceEnum.CAMERA_LINK,
        label: "Camera Link",
      },
      {
        value: FrameGrabberInterfaceEnum.USB,
        label: "USB",
      },
      { value: FrameGrabberInterfaceEnum.COAXPRESS, label: "CoaXPress" },
      {
        value: FrameGrabberInterfaceEnum.GIGE,
        label: "GigE",
      },
    ],
    [CategoryRelationMapKebab.LENS]: [
      { value: LensTypeEnum.CCTV, label: "CCTV" },
      { value: LensTypeEnum.TCL, label: "TCL" },
    ],
    [CategoryRelationMapKebab.LIGHT]: [],
    [CategoryRelationMapKebab.SOFTWARE]: [
      { value: SoftwareMakerEnum.EURESYS, label: "Euresys" },
      { value: SoftwareMakerEnum.MATROX, label: "Matrox" },
    ],
  };

  const categoryOptions: CategoryOptionsMap = {
    [CategoryRelationMapKebab.CAMERA]: [
      {
        label: "인터페이스",
        type: "select",
        options: [
          { value: CameraInterfaceEnum.GIGE, label: "GigE" },
          { value: CameraInterfaceEnum.USB, label: "USB" },
          { value: CameraInterfaceEnum.CAMERA_LINK, label: "Camera Link" },
          { value: CameraInterfaceEnum.COAXPRESS, label: "CoaXPress" },
        ],
      },
      {
        label: "제조사",
        type: "select",
        options: [
          { value: CameraMakerEnum.CREVIS, label: "Crevis" },
          { value: CameraMakerEnum.VIEWORKS, label: "Vieworks" },
          { value: CameraMakerEnum.BASLER, label: "Basler" },
          { value: CameraMakerEnum.HIK, label: "Hik" },
          { value: CameraMakerEnum.HUARAY, label: "Huaray" },
          { value: CameraMakerEnum.JAI, label: "JAI" },
        ],
      },
      {
        label: "X 해상도",
        type: "input",
        placeholder: "X 해상도 입력",
        unit: "px",
      },
      {
        label: "Y 해상도",
        type: "input",
        placeholder: "Y 해상도 입력",
        unit: "px",
      },
      {
        label: "속도",
        type: "input",
        placeholder: "속도 입력",
        unit: "fps",
      },
      {
        label: "컬러",
        type: "select",
        options: [
          { value: CameraColorEnum.MONO, label: "Mono" },
          { value: CameraColorEnum.COLOR, label: "Color" },
        ],
      },
      {
        label: "픽셀 사이즈",
        type: "input",
        placeholder: "픽셀 사이즈 입력",
        unit: "μm",
      },
      {
        label: "포멧 사이즈",
        type: "input",
        placeholder: "포멧 사이즈 입력",
        unit: "MB",
      },
      {
        label: "마운트",
        type: "input",
        placeholder: "마운트 입력",
      },
      {
        label: "센서",
        type: "input",
        placeholder: "센서 입력",
      },
    ],
    [CategoryRelationMapKebab.FRAMEGRABBER]: [
      {
        label: "제조사",
        type: "select",
        options: [
          { value: FrameGrabberMakerEnum.MATROX, label: "Matrox" },
          { value: FrameGrabberMakerEnum.EURESYS, label: "Euresys" },
          { value: FrameGrabberMakerEnum.ADLINK, label: "ADLINK" },
          { value: FrameGrabberMakerEnum.BASLER, label: "Basler" },
        ],
      },
      {
        label: "인터페이스",
        type: "select",
        options: [
          { value: FrameGrabberInterfaceEnum.GIGE, label: "GigE" },
          { value: FrameGrabberInterfaceEnum.USB, label: "USB" },
          {
            value: FrameGrabberInterfaceEnum.CAMERA_LINK,
            label: "Camera Link",
          },
          { value: FrameGrabberInterfaceEnum.COAXPRESS, label: "CoaXPress" },
        ],
      },
      {
        label: "Memory",
        type: "input",
        placeholder: "Memory 입력",
        unit: "MB",
      },
      {
        label: "PC Slot",
        type: "input",
        placeholder: "PC Slot 입력",
      },
      {
        label: "Connector",
        type: "input",
        placeholder: "Connector 입력",
      },
    ],
    [CategoryRelationMapKebab.LENS]: [
      {
        label: "제조사",
        type: "input",
        placeholder: "제조사 입력",
      },
      {
        label: "해상력",
        type: "input",
        placeholder: "해상력 입력",
        unit: "MP",
      },
      {
        label: "초점거리",
        type: "input",
        placeholder: "초점거리 입력",
        unit: "mm",
      },
      {
        label: "NA",
        type: "input",
        placeholder: "NA 입력",
      },
      {
        label: "F/#",
        type: "input",
        placeholder: "F/# 입력",
      },
      {
        label: "마운트",
        type: "select",
        options: [
          { value: LensMountEnum.C, label: "C" },
          { value: LensMountEnum.CS, label: "CS" },
          { value: LensMountEnum.F, label: "F" },
          { value: LensMountEnum.M, label: "M" },
        ],
      },
    ],
    [CategoryRelationMapKebab.LIGHT]: [],
    [CategoryRelationMapKebab.SOFTWARE]: [
      {
        label: "제조사",
        type: "select",
        options: [
          { value: SoftwareMakerEnum.EURESYS, label: "Euresys" },
          { value: SoftwareMakerEnum.MATROX, label: "Matrox" },
        ],
      },
    ],
  };

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
              options={selectProductOptions}
              onValueChange={(product) => {
                setSelectProduct(product as CategoryRelationMapKebab);
              }}
              defaultValue={selectProduct}
              size="full"
            />
          </div>
          <div className="flex w-1/2 flex-col gap-2">
            {selectCategoryOptions[selectProduct].length > 0 && (
              <>
                <label className="text-gray400 font-semibold">
                  카테고리 선택
                </label>
                <SelectBox
                  options={selectCategoryOptions[selectProduct]}
                  onValueChange={() => {}}
                  size="full"
                />
              </>
            )}
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
        </div>
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
        <div className="flex flex-wrap gap-5">
          {categoryOptions[selectProduct].map((field, index) => (
            <CategoryField
              key={`category-field-${index}`}
              field={field}
              index={index}
            />
          ))}
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
