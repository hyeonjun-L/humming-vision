import Image from "next/image";
import { gigEImage, linkImage, coaxImage, usbImage } from "public/cable";

function Cable() {
  const TABLE_CELL_CLASS = "border border-gray150 py-2 px-1";
  const ROWSPAN_CELL_CLASS = `${TABLE_CELL_CLASS} align-middle`;

  const CABLE_LIST = [
    {
      type: "GigE",
      image: gigEImage,
      headList: ["GigE", "데이터 전송량", "케이블 길이", "POE", "프레임그래버"],
      bodyList: [
        {
          values: ["1 GigE", "1 Gbit/s (125MB/s)", "100m", "가능"],
          rowSpan: {
            content: (
              <div className="flex items-center justify-center">
                2대 이상
                <br />
                동시 사용 시<br />
                전용 보드 필요
              </div>
            ),
            span: 3,
          },
        },
        {
          values: ["5 GigE", "5 Gbit/s (625MB/s)", "100m", "가능"],
        },
        {
          values: ["10 GigE", "10 Gbit/s (1,250MB/s)", "37m", "불가능"],
        },
      ],
    },
    {
      type: "link",
      image: linkImage,
      headList: [
        "Camera Link",
        "데이터 전송량",
        "케이블 길이",
        "POCL",
        "프레임그래버",
      ],
      bodyList: [
        {
          values: ["Base", "2.04 Gbit/s (255MB/s)", "7m", "가능"],
          rowSpan: {
            content: (
              <div className="flex items-center justify-center">필요</div>
            ),
            span: 3,
          },
        },
        {
          values: ["Medium", "4.08 Gbit/s (510MB/s)", "5m", "가능"],
        },
        {
          values: ["Full", "6.8 Gbit/s (850MB/s)", "5m", "가능"],
        },
      ],
      connectors: ["MDR", "SDR (Mini)"],
    },
    {
      type: "Coax",
      image: coaxImage,
      headList: [
        "Coaxpress",
        "데이터 전송량",
        "케이블 길이",
        "케이블을 통한 전원 공급",
        "프레임그래버",
      ],
      bodyList: [
        {
          values: ["CXP-3 / 1lane", "3.125 Gbit/s (325MB/s)", "100m", "가능"],
          rowSpan: {
            content: "필요",
            span: 3,
          },
        },
        {
          values: ["CXP-6 / 1lane", "6.25 Gbit/s (625MB/s)", "72m", "가능"],
        },
        {
          values: ["CXP-12 / 1lane", "12.5 Gbit/s (1,250MB/s)", "30m", "가능"],
        },
      ],
      connectors: ["DIN", "BNC", "Micro BNC"],
    },
    {
      type: "USB",
      image: usbImage,
      headList: [
        "USB",
        "데이터 전송량",
        "케이블 길이",
        "케이블을 통한 전원 공급",
        "프레임그래버",
      ],
      bodyList: [
        {
          values: [
            "Base",
            "5 Gbit/s (625MB/s)",
            "3.5m",
            "가능",
            "2대이상 동시 사용시 전용 보드 필요",
          ],
        },
      ],
      connectors: ["Micro B"],
    },
  ];

  return (
    <div className="mb-16 flex flex-col">
      <h2 className="bg-main w-fit px-10.5 py-[3px] text-xl font-bold text-white">
        Cable
      </h2>
      <p className="text-gray600 mt-5 mb-10">
        고객의 요청 사항에 맞게 길이와 제품 사양을 제작 할 수 있습니다. <br />
        제품에 따라 Angle 타입으로 제작이 가능합니다.
      </p>
      {CABLE_LIST.map(({ type, headList, bodyList, image, connectors }) => (
        <div
          key={type}
          className="border-gray200 flex w-full flex-wrap items-center justify-center gap-5 border-t py-[50px] sm:justify-between lg:flex-nowrap xl:gap-10"
        >
          <div className="relative h-28 w-[217px] sm:h-[204px] sm:w-[393px] lg:w-[240px] xl:w-[393px]">
            <Image
              src={image}
              alt={`${type} Image`}
              fill
              sizes="(min-width: 1280px) 393px, (min-width: 1024px) 240px, (min-width: 640px) 393px, 217px"
              className="object-contain"
            />
          </div>
          <div className="flex grow flex-col gap-2.5 text-xs sm:text-sm">
            <table className="table-fixed border border-gray-200 text-gray-700">
              <thead className="bg-[#F5F5FC] text-center font-bold">
                <tr>
                  {headList.map((header, idx) => (
                    <th key={idx} className={TABLE_CELL_CLASS}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-center">
                {bodyList.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.values.map((cell, idx) => (
                      <td key={idx} className={TABLE_CELL_CLASS}>
                        {cell.includes("(") ? (
                          <>
                            {cell.split(" (")[0]}
                            <br />({cell.split(" (")[1]}
                          </>
                        ) : (
                          cell
                        )}
                      </td>
                    ))}

                    {row.rowSpan && (
                      <td
                        rowSpan={row.rowSpan.span}
                        className={ROWSPAN_CELL_CLASS}
                      >
                        {row.rowSpan.content}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {connectors && connectors.length > 0 && (
              <p className="text-gray600 text-sm">
                *커넥터: {connectors.join(", ")}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cable;
