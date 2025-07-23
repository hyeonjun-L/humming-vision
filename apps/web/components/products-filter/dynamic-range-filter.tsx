"use client";
import { Checkbox } from "components/checkbox";
import { Slider } from "components/slider";
import { useUpdateSearchParams } from "hooks/useUpdateSearchParams";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "utils/debounce";

interface DynamicRangeFilterProps {
  filterKey: string;
  unit: string;
  min: number;
  max: number;
  initialRangeValues?: number[];
}

function DynamicRangeFilter({
  filterKey,
  unit,
  min,
  max,
  initialRangeValues = [],
}: DynamicRangeFilterProps) {
  const [selectedRange, setSelectedRange] = useState(initialRangeValues);

  const [minInput, setMinInput] = useState(String(selectedRange[0] ?? min));
  const [maxInput, setMaxInput] = useState(String(selectedRange[1] ?? max));
  const [minInputWidth, setMinInputWidth] = useState(20);
  const [maxInputWidth, setMaxInputWidth] = useState(20);

  const minSpanRef = useRef<HTMLSpanElement>(null);
  const maxSpanRef = useRef<HTMLSpanElement>(null);

  const { updateSearchParams } = useUpdateSearchParams();

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

  const updateWidths = () => {
    if (minSpanRef.current) {
      setMinInputWidth(minSpanRef.current.offsetWidth + 4);
    }
    if (maxSpanRef.current) {
      setMaxInputWidth(maxSpanRef.current.offsetWidth + 4);
    }
  };

  useEffect(() => {
    updateWidths();
  }, [minInput, maxInput]);

  return (
    <div className="flex flex-col space-y-3 pb-2">
      <div className="flex items-center gap-2.5">
        <Checkbox
          checked={initialRangeValues.length > 0}
          onCheckedChange={(checked) => {
            if (checked) {
              setSelectedRange([
                selectedRange[0] ?? min,
                selectedRange[1] ?? max,
              ]);
              updateSearchParams(filterKey, [min, max].join(","));
            } else {
              updateSearchParams(filterKey, null);
            }
          }}
        />

        <div className="text-main flex items-center gap-1.5 pb-0.5">
          <input
            name="dynamic-range-min"
            className="inline-block min-w-0 appearance-none border-none bg-transparent text-center text-sm outline-none"
            style={{ width: `${minInputWidth}px` }}
            value={minInput}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setMinInput(val);

              const intVal = parseInt(val);
              const intMax = parseInt(maxInput || String(max));

              if (
                !isNaN(intVal) &&
                intVal >= min &&
                intVal <= max &&
                intVal <= intMax
              ) {
                handleRangeChange(filterKey, val, maxInput || String(max));
              }
            }}
            onBlur={() => {
              const intVal = parseInt(minInput);
              const intMax = parseInt(maxInput || String(max));
              if (isNaN(intVal) || intVal < min) {
                const corrected = String(min);
                setMinInput(corrected);
                handleRangeChange(
                  filterKey,
                  corrected,
                  maxInput || String(max),
                );
              } else if (intVal > intMax) {
                const corrected = String(intMax);
                setMinInput(corrected);
                handleRangeChange(
                  filterKey,
                  corrected,
                  maxInput || String(max),
                );
              }
            }}
          />
          <span className="text-gray600">~</span>
          <input
            name="dynamic-range-max"
            className="inline-block min-w-0 appearance-none border-none bg-transparent text-center text-sm outline-none"
            style={{ width: `${maxInputWidth}px` }}
            value={maxInput}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setMaxInput(val);

              const intVal = parseInt(val);
              const intMin = parseInt(minInput || String(min));

              if (
                !isNaN(intVal) &&
                intVal >= min &&
                intVal <= max &&
                intVal >= intMin
              ) {
                handleRangeChange(filterKey, minInput || String(min), val);
              }
            }}
            onBlur={() => {
              const intVal = parseInt(maxInput);
              const intMin = parseInt(minInput || String(min));
              if (isNaN(intVal) || intVal > max) {
                const corrected = String(max);
                setMaxInput(corrected);
                handleRangeChange(
                  filterKey,
                  minInput || String(min),
                  corrected,
                );
              } else if (intVal < intMin) {
                const corrected = String(intMin);
                setMaxInput(corrected);
                handleRangeChange(
                  filterKey,
                  minInput || String(min),
                  corrected,
                );
              }
            }}
          />
          <span className="text-gray600">{unit}</span>
        </div>
      </div>

      <div className="invisible absolute h-0 overflow-hidden whitespace-pre">
        <span ref={minSpanRef} className="text-sm">
          {minInput || min}
        </span>
        <span ref={maxSpanRef} className="text-sm">
          {maxInput || max}
        </span>
      </div>

      <div className="px-3">
        <Slider
          min={min}
          max={max}
          step={1}
          value={[Number(minInput) || min, Number(maxInput) || max]}
          onValueChange={(values) => {
            if (
              values &&
              values.length === 2 &&
              values[0] !== undefined &&
              values[1] !== undefined
            ) {
              setMinInput(String(values[0]));
              setMaxInput(String(values[1]));
              handleRangeChange(
                filterKey,
                values[0].toString(),
                values[1].toString(),
              );
            }
          }}
          className="w-full"
          disabled={!initialRangeValues.length}
        />
      </div>

      <div className="mt-6 flex justify-between text-xs text-gray-500">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}

export default DynamicRangeFilter;
