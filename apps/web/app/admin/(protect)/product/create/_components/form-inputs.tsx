import { Control, FieldPath } from "react-hook-form";
import { Input } from "components/input";
import { SelectBox } from "components/select-box/select-box";
import ImageUpload from "components/image-upload/image-upload";
import PdfUpload from "components/pdf-upload";
import { ProductFormData } from "../_types/product.type";
import { FormField } from "./form-field";

interface BaseInputProps<TName extends FieldPath<ProductFormData>> {
  name: TName;
  control: Control<ProductFormData>;
  label: string;
  required?: boolean;
  className?: string;
}

interface TextInputProps<TName extends FieldPath<ProductFormData>>
  extends BaseInputProps<TName> {
  placeholder?: string;
  inputClassName?: string;
}

interface TextAreaInputProps<TName extends FieldPath<ProductFormData>>
  extends BaseInputProps<TName> {
  placeholder?: string;
  textAreaClassName?: string;
}

interface SelectInputProps<TName extends FieldPath<ProductFormData>>
  extends BaseInputProps<TName> {
  options: Array<{ label: string; value: string }>;
}

interface ImageUploadInputProps<TName extends FieldPath<ProductFormData>>
  extends BaseInputProps<TName> {
  maxImages?: number;
}

export function TextInput<TName extends FieldPath<ProductFormData>>({
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
      {({ field }) => (
        <Input
          {...field}
          size="default"
          placeholder={placeholder}
          className={inputClassName}
        />
      )}
    </FormField>
  );
}

export function TextAreaInput<TName extends FieldPath<ProductFormData>>({
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
      {({ field }) => (
        <textarea
          {...field}
          placeholder={placeholder}
          className={textAreaClassName}
        />
      )}
    </FormField>
  );
}

export function SelectInput<TName extends FieldPath<ProductFormData>>({
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
      {({ field }) => (
        <SelectBox
          options={options}
          onValueChange={field.onChange}
          value={field.value as string}
          size="full"
        />
      )}
    </FormField>
  );
}

export function ImageUploadInput<TName extends FieldPath<ProductFormData>>({
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
      {({ field }) => (
        <ImageUpload
          images={field.value}
          onImagesChange={field.onChange}
          maxImages={maxImages}
        />
      )}
    </FormField>
  );
}

export function PdfUploadInput<TName extends FieldPath<ProductFormData>>({
  name,
  control,
  label,
  required = false,
  className,
}: BaseInputProps<TName>) {
  return (
    <FormField
      name={name}
      control={control}
      label={label}
      required={required}
      className={className}
    >
      {({ field }) => (
        <PdfUpload file={field.value} onFileChange={field.onChange} />
      )}
    </FormField>
  );
}
