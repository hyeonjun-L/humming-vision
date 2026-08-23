"use client";

import Accordion from "components/accordion";
import DynamicFilter from "./dynamic-range-filter";
import StaticFilter from "./static-filter";
import { useValidatedSearchParam } from "./validator/useValidatedSearchParam";
import { z } from "zod";
import NumberRangeTuple from "./validator/number-range-tuple-schemas";
import { LensMount, LensTypeEnum } from "@humming-vision/shared";
import { useLensType } from "hooks/useLensType";

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
  const currentType = useLensType();

  const isTCL = currentType === LensTypeEnum.TCL;

  const currentMount = useValidatedSearchParam(
    "lens__mount__equal",
    LensMountEnum,
  );
  const currentFocalLenght =
    useValidatedSearchParam("lens__focalLength__between", NumberRangeTuple) ??
    [];
  const currentWD =
    useValidatedSearchParam("lens__resolution__between", NumberRangeTuple) ??
    [];
  const currentFormatSize =
    useValidatedSearchParam("lens__formatSize__between", NumberRangeTuple) ??
    [];

  return (
    <>
      <Accordion
        title={`${isTCL ? "배율" : "초점거리"} (${isTCL ? "x" : "mm"})`}
        defaultOpen={currentFocalLenght.length > 0}
        className="border-gray200 border-b"
      >
        <DynamicFilter
          filterKey="lens__focalLength__between"
          initialRangeValues={currentFocalLenght}
          min={0}
          max={isTCL ? 20 : 200}
          unit={isTCL ? "x" : "mm"}
        />
      </Accordion>

      {/* TCL은 resolution 컬럼을 WD(작동거리)로 사용한다 */}
      {isTCL && (
        <Accordion
          title="WD (mm)"
          defaultOpen={currentWD.length > 0}
          className="border-gray200 border-b"
        >
          <DynamicFilter
            filterKey="lens__resolution__between"
            initialRangeValues={currentWD}
            min={1}
            max={1000}
            unit="mm"
          />
        </Accordion>
      )}

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
