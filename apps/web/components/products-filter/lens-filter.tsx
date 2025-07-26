"use client";

import Accordion from "components/accordion";
import DynamicFilter from "./dynamic-range-filter";
import StaticFilter from "./static-filter";
import { useValidatedSearchParam } from "./validator/useValidatedSearchParam";
import { z } from "zod";
import NumberRangeTuple from "./validator/number-range-tuple-schemas";
import { LensMount, LensType } from "@humming-vision/shared";
import { usePathname } from "next/navigation";

const LensMountEnum = z.enum(["C", "CS", "F", "M"] as [
  LensMount,
  ...LensMount[],
]);

const LENS_MOUNT: { value: LensMount; label: string }[] = [
  { value: "C", label: "C-Mount" },
  { value: "CS", label: "CS-Mount" },
  { value: "F", label: "F-Mount" },
  { value: "M", label: "M-Mount" },
];

function LensFilter() {
  const pathName = usePathname();

  const currentType = pathName.split("/")[2]?.toUpperCase() as LensType;

  const currentMount = useValidatedSearchParam(
    "lens__mount__equal",
    LensMountEnum,
  );
  const currentFocalLenght =
    useValidatedSearchParam("lens__focalLength__between", NumberRangeTuple) ??
    [];
  const currentFormatSize =
    useValidatedSearchParam("lens__formatSize__between", NumberRangeTuple) ??
    [];

  return (
    <>
      <Accordion
        title={`초점거리 (${currentType === "CCTV" ? "mm" : "x"})`}
        defaultOpen={currentFocalLenght.length > 0}
        className="border-gray200 border-b"
      >
        <DynamicFilter
          filterKey="lens__focalLength__between"
          initialRangeValues={currentFocalLenght}
          min={0}
          max={currentType === "CCTV" ? 200 : 20}
          unit={currentType === "CCTV" ? "mm" : "x"}
        />
      </Accordion>

      <Accordion
        title="포맷 사이즈 (mm)"
        defaultOpen={currentFormatSize.length > 0}
        className="border-gray200 border-b"
      >
        <DynamicFilter
          filterKey="lens__formatSize__between"
          initialRangeValues={currentFormatSize}
          min={0}
          max={80}
          unit="mm"
        />
      </Accordion>

      <Accordion
        title="마운트"
        defaultOpen={!!currentMount}
        className="border-gray200 border-b"
      >
        <StaticFilter
          filterKey="lens__mount__equal"
          currentValue={currentMount}
          options={LENS_MOUNT}
        />
      </Accordion>
    </>
  );
}

export default LensFilter;
