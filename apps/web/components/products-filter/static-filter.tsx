import { RadioGroup, RadioGroupItem } from "components/radio-group";
import { useUpdateSearchParams } from "hooks/useUpdateSearchParams";
import cn from "libs/cn";

interface StaticFilterProps {
  filterKey: string;
  options: { value: string; label: string }[];
  currentValue?: string | null;
  className?: string;
}

function StaticFilter({
  filterKey,
  options,
  className,
  currentValue,
}: StaticFilterProps) {
  const { updateSearchParams, deleteSearchParams } = useUpdateSearchParams();

  const handleValueChange = (value: string) => {
    updateSearchParams(filterKey, value || null);
  };

  const handleClick = (value: string) => {
    if (value === currentValue) {
      deleteSearchParams(filterKey);
    }
  };

  return (
    <RadioGroup
      value={currentValue || ""}
      onValueChange={(value) => handleValueChange(value)}
    >
      {options.map(({ value, label }, index) => (
        <div
          key={value}
          className={cn(
            "border-gray200 flex items-center space-x-3 border-b py-2.5",
            {
              "border-b-0": index === options.length - 1,
            },
            className,
          )}
        >
          <RadioGroupItem
            value={value}
            id={`${filterKey}-${value}`}
            onClick={() => handleClick(value)}
          />
          <label
            htmlFor={`${filterKey}-${value}`}
            className="cursor-pointer text-sm font-medium"
          >
            {label}
          </label>
        </div>
      ))}
    </RadioGroup>
  );
}

export default StaticFilter;
