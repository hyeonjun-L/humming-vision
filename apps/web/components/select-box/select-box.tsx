import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "components/select-box/select";

type SelectBoxProps = {
  options: { value: string; label: string }[];
  selectLabel?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  size?: "default" | "sm" | "full";
};

export function SelectBox({
  options,
  selectLabel,
  placeholder,
  defaultValue,
  value,
  onValueChange,
  size = "default",
}: SelectBoxProps) {
  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      value={value}
    >
      <SelectTrigger size={size}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
