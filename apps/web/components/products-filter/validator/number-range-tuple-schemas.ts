import { z } from "zod";

const NumberRangeTuple = z
  .string()
  .transform((val) => {
    const arr = val.split(",").map(Number);
    return arr;
  })
  .refine(
    (arr) =>
      arr.length === 2 && arr.every((v) => typeof v === "number" && !isNaN(v)),
    { message: "값은 반드시 2개의 숫자여야 합니다." },
  )
  .pipe(z.tuple([z.number(), z.number()]));

export default NumberRangeTuple;
