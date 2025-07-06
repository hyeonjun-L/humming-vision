import { Control, FieldPath } from "react-hook-form";
import { Input } from "components/input";
import { SelectBox } from "components/select-box/select-box";
import ImageUpload from "components/image-upload/image-upload";
import PdfUpload from "components/pdf-upload";
import { ProductUpdateFormData } from "../_types/product-update.type";
import { FormField } from "./form-field";

interface BaseInputProps<TName extends FieldPath<ProductUpdateFormData>> {
  name: TName;
  control: Control<ProductUpdateFormData>;
  label: string;
  required?: boolean;
  className?: string;
}

interface TextInputProps<TName extends FieldPath<ProductUpdateFormData>>
  extends BaseInputProps<TName> {
  placeholder?: string;
  inputClassName?: string;
}

interface TextAreaInputProps<TName extends FieldPath<ProductUpdateFormData>>
  extends BaseInputProps<TName> {
  placeholder?: string;
  textAreaClassName?: string;
}

interface SelectInputProps<TName extends FieldPath<ProductUpdateFormData>>
  extends BaseInputProps<TName> {
  options: Array<{ label: string; value: string }>;
}

interface ImageUploadInputProps<TName extends FieldPath<ProductUpdateFormData>>
  extends BaseInputProps<TName> {
  maxImages?: number;
}

interface PdfUploadInputProps<TName extends FieldPath<ProductUpdateFormData>>
  extends BaseInputProps<TName> {
  label: string;
}

export function TextInput<TName extends FieldPath<ProductUpdateFormData>>({
  name,
  control,
  label,
  required = false,
  className,
  placeholder,
  inputClassName = "text-gray600 focus-visible:border-gray200 rounded-none border-x-0 border-t-0 border-b text-base outline-none placeholder:text-sm focus-visible:ring-0",
}: TextInputProps<TName>) {
  return (
    <FormField
      name={name}
      control={control}
      label={label}
      required={required}
      className={className}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {({ field }: any) => (
        <Input
          {...field}
          value={field.value ?? ""}
          size="default"
          placeholder={placeholder}
          className={inputClassName}
        />
      )}
    </FormField>
  );
}

export function TextAreaInput<TName extends FieldPath<ProductUpdateFormData>>({
  name,
  control,
  label,
  required = false,
  className,
  placeholder,
  textAreaClassName = "text-gray600 placeholder:text-gray300 field-sizing-content max-h-[11.25rem] resize-none rounded-none border-x-0 border-t-0 border-b px-3 py-1 outline-none placeholder:text-sm focus-visible:ring-0",
}: TextAreaInputProps<TName>) {
  return (
    <FormField
      name={name}
      control={control}
      label={label}
      required={required}
      className={className}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {({ field }: any) => (
        <textarea
          {...field}
          value={field.value ?? ""}
          placeholder={placeholder}
          className={textAreaClassName}
        />
      )}
    </FormField>
  );
}

export function SelectInput<TName extends FieldPath<ProductUpdateFormData>>({
  name,
  control,
  label,
  required = false,
  className,
  options,
}: SelectInputProps<TName>) {
  return (
    <FormField
      name={name}
      control={control}
      label={label}
      required={required}
      className={className}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {({ field }: any) => (
        <SelectBox
          value={field.value ?? ""}
          onValueChange={field.onChange}
          options={options}
          placeholder={`${label}를 선택하세요`}
        />
      )}
    </FormField>
  );
}

export function ImageUploadInput<
  TName extends FieldPath<ProductUpdateFormData>,
>({
  name,
  control,
  label,
  required = false,
  className,
  maxImages = 10,
}: ImageUploadInputProps<TName>) {
  return (
    <FormField
      name={name}
      control={control}
      label={label}
      required={required}
      className={className}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {({ field }: any) => (
        <ImageUpload
          images={field.value || []}
          onImagesChange={field.onChange}
          maxImages={maxImages}
        />
      )}
    </FormField>
  );
}

export function PdfUploadInput<TName extends FieldPath<ProductUpdateFormData>>({
  name,
  control,
  label,
  required = false,
  className,
}: PdfUploadInputProps<TName>) {
  return (
    <FormField
      name={name}
      control={control}
      label={label}
      required={required}
      className={className}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {({ field }: any) => (
        <PdfUpload file={field.value} onFileChange={field.onChange} />
      )}
    </FormField>
  );
}
