"use client";

import Accordion from "components/accordion";
import DynamicFilter from "./dynamic-range-filter";
import StaticFilter from "./static-filter";
import { useValidatedSearchParam } from "./validator/useValidatedSearchParam";
import { z } from "zod";
import NumberRangeTuple from "./validator/number-range-tuple-schemas";
import {
  CameraInterface,
  CameraMaker,
  CameraType,
} from "@humming-vision/shared";
import { usePathname } from "next/navigation";

const CameraMakerEnum = z.enum([
  "CREVIS",
  "VIEWORKS",
  "BASLER",
  "HIK",
  "HUARAY",
  "JAI",
] as [CameraMaker, ...CameraMaker[]]);

const CameraInterfaceEnum = z.enum([
  "GIGE",
  "USB",
  "CAMERA_LINK",
  "COAXPRESS",
] as [CameraInterface, ...CameraInterface[]]);

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
  const pathName = usePathname();

  const currentType = pathName.split("/")[2]?.toUpperCase() as CameraType;

  const currentMaker = useValidatedSearchParam(
    "camera__maker__equal",
    CameraMakerEnum,
  );
  const currentInterface = useValidatedSearchParam(
    "camera__interface__equal",
    CameraInterfaceEnum,
  );
  const currentResolution =
    useValidatedSearchParam("_camera__resolution__between", NumberRangeTuple) ??
    [];
  const currentSpeed =
    useValidatedSearchParam("camera__speed__between", NumberRangeTuple) ?? [];

  return (
    <>
      <Accordion
        title="제조사"
        defaultOpen={!!currentMaker}
        className="border-gray200 border-b"
      >
        <StaticFilter
          filterKey="camera__maker__equal"
          currentValue={currentMaker}
          options={CAMERA_MAKERS}
        />
      </Accordion>

      <Accordion
        title="인터페이스"
        defaultOpen={!!currentInterface}
        className="border-gray200 border-b"
      >
        <StaticFilter
          filterKey="camera__interface__equal"
          currentValue={currentInterface}
          options={CAMERA_INTERFACES}
        />
      </Accordion>

      <Accordion
        title={`해상도 (${currentType === "AREA" ? "MP" : "k"})`}
        defaultOpen={currentResolution.length > 0}
        className="border-gray200 border-b"
      >
        <DynamicFilter
          filterKey="_camera__resolution__between"
          initialRangeValues={currentResolution}
          min={0}
          max={currentType === "AREA" ? 250 : 18}
          unit={currentType === "AREA" ? "MP" : "k"}
        />
      </Accordion>

      <Accordion
        title={`촬영 속도 (${currentType === "LINE" ? "kHz" : "fps"})`}
        defaultOpen={currentSpeed.length > 0}
        className="border-gray200 border-b"
      >
        <DynamicFilter
          filterKey="camera__speed__between"
          initialRangeValues={currentSpeed}
          min={0}
          max={currentType === "LINE" ? 500 : 1000}
          unit={currentType === "LINE" ? "kHz" : "fps"}
        />
      </Accordion>
    </>
  );
}

export default CameraFilter;
