"use client";
import { Checkbox } from "components/checkbox";
import { Slider } from "components/slider";
import { useUpdateSearchParams } from "hooks/useUpdateSearchParams";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { debounce } from "utils/debounce";

interface DynamicRangeFilterProps {
  filterKey: string;
  unit: string;
  min: number;
  max: number;
}

function DynamicRangeFilter({
  filterKey,
  unit,
  min,
  max,
}: DynamicRangeFilterProps) {
  const searchParams = useSearchParams();

  const initialRangeValues =
    searchParams.get(filterKey)?.split(",").map(Number) || [];

  const [selectedRange, setSelectedRange] = useState(initialRangeValues);

  const updateSearchParams = useUpdateSearchParams();

  const debouncedUpdate = useMemo(
    () =>
      debounce((key: string, minValue: string, maxValue: string) => {
        const rangeArray: string[] = [];
        if (minValue) rangeArray.push(minValue);
        if (maxValue) rangeArray.push(maxValue);

        if (rangeArray.length === 0) {
          updateSearchParams(key, null);
        } else {
          updateSearchParams(key, rangeArray.join(","));
        }
      }, 800),
    [updateSearchParams],
  );

  const handleRangeChange = useCallback(
    (key: string, min: string, max: string) => {
      setSelectedRange([parseInt(min), parseInt(max)]);
      debouncedUpdate(key, min, max);
    },
    [debouncedUpdate],
  );

  return (
    <div className="flex flex-col space-y-3 pb-2">
      <div className="flex items-center gap-2.5">
        <Checkbox
          checked={!!initialRangeValues.length}
          onCheckedChange={(checked) => {
            if (!checked) {
              handleRangeChange("_camera__resolution__between", "", "");
            }
          }}
        />
        <div className="text-main flex items-center gap-1.5 pb-0.5">
          {selectedRange[0] ?? min} <span className="text-gray600">~</span>{" "}
          {selectedRange[1] ?? max} <span className="text-gray600">{unit}</span>
        </div>
      </div>

      <div className="px-3">
        <Slider
          min={min}
          max={max}
          step={1}
          value={[selectedRange[0] ?? min, selectedRange[1] ?? max]}
          onValueChange={(values) => {
            if (
              values &&
              values.length === 2 &&
              values[0] !== undefined &&
              values[1] !== undefined
            ) {
              handleRangeChange(
                "_camera__resolution__between",
                values[0].toString(),
                values[1].toString(),
              );
            }
          }}
          className="w-full"
          disabled={!selectedRange.length}
        />
      </div>

      <div className="mt-6 flex justify-between text-xs text-gray-500">
        <span>
          {selectedRange[0] ?? min}
          {unit}
        </span>
        <span>
          {selectedRange[1] ?? max}
          {unit}
        </span>
      </div>
    </div>
  );
}

export default DynamicRangeFilter;
