import * as React from "react";

import { SearchSVG } from "public/svg";
import cn from "libs/cn";

const BASE_INPUT_STYLES = [
  "file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 border bg-transparent text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
] as const;

const SIZE_STYLES = {
  sm: "data-[size=sm]:h-8 data-[size=sm]:py-1 data-[size=sm]:text-sm",
  default: "data-[size=default]:h-10 data-[size=default]:py-2",
} as const;

interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  size?: "sm" | "default";
}

function Input({ className, type, size = "default", ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={size}
      className={cn(
        ...BASE_INPUT_STYLES,
        "placeholder:text-muted-foreground border-input rounded-md",
        "data-[size=sm]:px-2",
        "data-[size=default]:px-3",
        SIZE_STYLES.sm,
        SIZE_STYLES.default,
        className,
      )}
      {...props}
    />
  );
}

interface SearchInputProps
  extends Omit<React.ComponentProps<"input">, "type" | "size" | "onSubmit"> {
  size?: "sm" | "default";
  onSubmit?: (value: string) => void;
}

function SearchInput({
  className,
  size = "default",
  placeholder,
  onSubmit,
  defaultValue,
  ...props
}: SearchInputProps) {
  const [inputValue, setInputValue] = React.useState(
    String(defaultValue || ""),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(inputValue);
    }
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <button
        type="submit"
        className="absolute top-1/2 right-3 size-6 -translate-y-1/2 overflow-hidden text-gray-400 hover:text-gray-600"
      >
        <SearchSVG />
      </button>
      <input
        type="search"
        data-slot="input"
        data-size={size}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={cn(
          ...BASE_INPUT_STYLES,
          "placeholder:text-gray300 border-gray200 rounded-sm font-normal placeholder:text-sm placeholder:sm:text-base",
          "data-[size=sm]:pr-2 data-[size=sm]:pl-8",
          "data-[size=default]:h-10 data-[size=default]:px-4 data-[size=default]:py-2",
          SIZE_STYLES.sm,
          className,
        )}
        {...props}
      />
    </form>
  );
}

export { Input, SearchInput };
