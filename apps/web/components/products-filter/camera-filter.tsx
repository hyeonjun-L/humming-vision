"use client";

import Accordion from "components/accordion";
import { RadioGroup, RadioGroupItem } from "components/radio-group";
import { Slider } from "components/slider";
import cn from "libs/cn";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { debounce } from "utils/debounce";
import DynamicFilter from "./dynamic-range-filter";

type CameraMaker = "CREVIS" | "VIEWORKS" | "BASLER" | "HIK" | "HUARAY" | "JAI";
type CameraInterface = "GIGE" | "USB" | "CAMERA_LINK" | "COAXPRESS";

const CAMERA_MAKERS: { value: CameraMaker; label: string }[] = [
  { value: "CREVIS", label: "CREVIS" },
  { value: "VIEWORKS", label: "VIEWORKS" },
  { value: "BASLER", label: "BASLER" },
  { value: "HIK", label: "HIK" },
  { value: "HUARAY", label: "HUARAY" },
  { value: "JAI", label: "JAI" },
];

const CAMERA_INTERFACES: { value: CameraInterface; label: string }[] = [
  { value: "GIGE", label: "GigE" },
  { value: "USB", label: "USB" },
  { value: "CAMERA_LINK", label: "Camera Link" },
  { value: "COAXPRESS", label: "CoaXPress" },
];

function CameraFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      params.set("page", "1");

      router.replace(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const handleMakerChange = (maker: CameraMaker | "") => {
    updateSearchParams("camera__maker__equal", maker || null);
  };

  const handleInterfaceChange = (interfaceType: CameraInterface | "") => {
    updateSearchParams("camera__interface__equal", interfaceType || null);
  };

  const handleSearchChange = useCallback(
    (value: string) => {
      updateSearchParams("where__name__i_like", value || null);
    },
    [updateSearchParams],
  );

  const currentMaker = searchParams.get(
    "camera__maker__equal",
  ) as CameraMaker | null;
  const currentInterface = searchParams.get(
    "camera__interface__equal",
  ) as CameraInterface | null;

  const currentResolution =
    searchParams.get("_camera__resolution__between")?.split(",") || [];
  const currentSpeed =
    searchParams.get("camera__speed__between")?.split(",") || [];

  return (
    <>
      <Accordion title="제조사" className="border-gray200 border-b">
        <RadioGroup
          value={currentMaker || ""}
          onValueChange={(value) =>
            handleMakerChange(value as CameraMaker | "")
          }
        >
          {CAMERA_MAKERS.map((maker, index) => (
            <div
              key={maker.value}
              className={cn(
                "border-gray200 flex items-center space-x-3 border-b py-2.5",
                {
                  "border-b-0": index === CAMERA_MAKERS.length - 1,
                },
              )}
            >
              <RadioGroupItem value={maker.value} id={`maker-${maker.value}`} />
              <label
                htmlFor={`maker-${maker.value}`}
                className="cursor-pointer text-sm font-medium"
              >
                {maker.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </Accordion>

      <Accordion title="인터페이스" className="border-gray200 border-b">
        <RadioGroup
          value={currentInterface || ""}
          onValueChange={(value) =>
            handleInterfaceChange(value as CameraInterface | "")
          }
        >
          {CAMERA_INTERFACES.map((interfaceItem, index) => (
            <div
              key={interfaceItem.value}
              className={cn(
                "border-gray200 flex items-center space-x-3 border-b py-2.5",
                {
                  "border-b-0": index === CAMERA_INTERFACES.length - 1,
                },
              )}
            >
              <RadioGroupItem
                value={interfaceItem.value}
                id={`interface-${interfaceItem.value}`}
              />
              <label
                htmlFor={`interface-${interfaceItem.value}`}
                className="cursor-pointer text-sm font-medium"
              >
                {interfaceItem.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </Accordion>

      <Accordion
        title="해상도 (MP)"
        defaultOpen
        className="border-gray200 border-b"
      >
        <DynamicFilter
          filterKey="_camera__resolution__between"
          min={0}
          max={155}
          unit="M"
        />
      </Accordion>

      <Accordion title="촬영 속도">
        <DynamicFilter
          filterKey="camera__speed__between"
          min={0}
          max={19789}
          unit="fps"
        />
      </Accordion>

      <Accordion title="검색">
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="제품명으로 검색..."
              defaultValue={searchParams.get("where__name__i_like") || ""}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </Accordion>
    </>
  );
}

export default CameraFilter;
