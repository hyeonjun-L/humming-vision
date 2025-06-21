import * as React from "react";
import cn from "utils/cn";

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
  className?: string;
  onValueChange?: (value: string) => void;
};

export function SelectBox({
  options,
  selectLabel,
  placeholder = "Select a fruit",
  defaultValue,
  value,
  className,
  onValueChange,
}: SelectBoxProps) {
  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      value={value}
    >
      <SelectTrigger className={cn("w-[180px]", className)}>
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
