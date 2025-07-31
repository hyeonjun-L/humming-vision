/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldPath } from "react-hook-form";
import { Input } from "components/input";
import { SelectBox } from "components/select-box/select-box";
import ImageUpload from "components/image-upload/image-upload";
import FileUpload from "components/file-upload";
import { ProductFormData } from "../create/_types/product.type";
import { ProductUpdateFormData } from "../update/_types/product-update.type";
import { FormField } from "../create/_components/form-field";

type SupportedFormData = ProductFormData | ProductUpdateFormData;

interface BaseInputProps<
  T extends SupportedFormData,
  TName extends FieldPath<T>,
> {
  name: TName;
  control: Control<T>;
  label: string;
  className?: string;
  accept?: string[]; // 예: ['.pdf', '.dwg', '.stp']
}

interface TextInputProps<
  T extends SupportedFormData,
  TName extends FieldPath<T>,
> extends BaseInputProps<T, TName> {
  placeholder?: string;
  inputClassName?: string;
}

interface TextAreaInputProps<
  T extends SupportedFormData,
  TName extends FieldPath<T>,
> extends BaseInputProps<T, TName> {
  placeholder?: string;
  textAreaClassName?: string;
}

interface SelectInputProps<
  T extends SupportedFormData,
  TName extends FieldPath<T>,
> extends BaseInputProps<T, TName> {
  options: Array<{ label: string; value: string }>;
}

interface ImageUploadInputProps<
  T extends SupportedFormData,
  TName extends FieldPath<T>,
> extends BaseInputProps<T, TName> {
  maxImages?: number;
}

type FileUploadInputProps<
  T extends SupportedFormData,
  TName extends FieldPath<T>,
> = BaseInputProps<T, TName>;

export function TextInput<
  T extends SupportedFormData,
  TName extends FieldPath<T>,
>({
  name,
  control,
  label,
  className,
  placeholder,
  inputClassName = "text-gray600 focus-visible:border-gray200 rounded-none border-x-0 border-t-0 border-b text-base outline-none placeholder:text-sm focus-visible:ring-0",
}: TextInputProps<T, TName>) {
  return (
    <FormField
      name={name as any}
      control={control as any}
      label={label}
      className={className}
    >
      {({ field }) => (
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

export function TextAreaInput<
  T extends SupportedFormData,
  TName extends FieldPath<T>,
>({
  name,
  control,
  label,
  className,
  placeholder,
  textAreaClassName = "text-gray600 placeholder:text-gray300 field-sizing-content max-h-[11.25rem] resize-none rounded-none border-x-0 border-t-0 border-b px-3 py-1 outline-none placeholder:text-sm focus-visible:ring-0",
}: TextAreaInputProps<T, TName>) {
  return (
    <FormField
      name={name as any}
      control={control as any}
      label={label}
      className={className}
    >
      {({ field }) => (
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

export function SelectInput<
  T extends SupportedFormData,
  TName extends FieldPath<T>,
>({ name, control, label, className, options }: SelectInputProps<T, TName>) {
  return (
    <FormField
      name={name as any}
      control={control as any}
      label={label}
      className={className}
    >
      {({ field }) => (
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
  T extends SupportedFormData,
  TName extends FieldPath<T>,
>({
  name,
  control,
  label,
  className,
  maxImages = 10,
}: ImageUploadInputProps<T, TName>) {
  return (
    <FormField
      name={name as any}
      control={control as any}
      label={label}
      className={className}
    >
      {({ field }) => (
        <ImageUpload
          images={field.value || []}
          onImagesChange={field.onChange}
          maxImages={maxImages}
        />
      )}
    </FormField>
  );
}

export function FileUploadInput<
  T extends SupportedFormData,
  TName extends FieldPath<T>,
>({
  name,
  control,
  label,
  className,
  accept, // 예: ['.pdf', '.dwg', '.stp']
}: FileUploadInputProps<T, TName>) {
  return (
    <FormField
      name={name as any}
      control={control as any}
      label={label}
      className={className}
    >
      {({ field }) => (
        <FileUpload
          file={field.value}
          onFileChange={field.onChange}
          accept={accept}
        />
      )}
    </FormField>
  );
}
