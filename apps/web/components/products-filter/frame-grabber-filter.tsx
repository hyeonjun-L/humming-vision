"use client";

import Accordion from "components/accordion";
import StaticFilter from "./static-filter";
import { useValidatedSearchParam } from "./validator/useValidatedSearchParam";
import { z } from "zod";
import { FrameGrabberMaker } from "@humming-vision/shared";

const FrameGrabberMakerEnum = z.enum([
  "MATROX",
  "EURESYS",
  "ADLINK",
  "BASLER",
] as [FrameGrabberMaker, ...FrameGrabberMaker[]]);

const FRAME_GRABBER_MAKERS: { value: FrameGrabberMaker; label: string }[] = [
  { value: "MATROX", label: "MATROX" },
  { value: "EURESYS", label: "EURESYS" },
  { value: "ADLINK", label: "ADLINK" },
  { value: "BASLER", label: "BASLER" },
];

function FrameGrabberFilter() {
  const currentMaker = useValidatedSearchParam(
    "frameGrabber__maker__equal",
    FrameGrabberMakerEnum,
  );

  return (
    <Accordion
      title="제조사"
      defaultOpen={!!currentMaker}
      className="border-gray200 border-b"
    >
      <StaticFilter
        filterKey="frameGrabber__maker__equal"
        currentValue={currentMaker}
        options={FRAME_GRABBER_MAKERS}
      />
    </Accordion>
  );
}

export default FrameGrabberFilter;
