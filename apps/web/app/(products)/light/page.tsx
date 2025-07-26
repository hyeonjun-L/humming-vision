import cn from "libs/cn";
import Image from "next/image";
import {
  DB_DBZ_DBS_Image,
  DDM_Image,
  DLA_DL_Image,
  DRT_DRF_Image,
  ICFV_Image,
  IDM_Image,
  IFRK_Image,
  IFS_Image,
  ILA_Image,
} from "public/light";
import { Fragment } from "react";

function page() {
  const LIGHT_TYPE_LIST = [
    {
      image: DRT_DRF_Image,
      imageStyle: "object-contain",
      name: "원형조명",
      type: "DIRECT LIGHTNING",
      series: ["DRT", "DRF"],
      description: "고밀도의 광량으로 확실한 검사 기능",
      features: [
        "FPCB 채택으로 LED를 우산 형태로 배치, 중심부를 집중 조사하여 밝은 광량을 얻는다.",
        "LED 조명의 표준타입으로 넓은 용도에 이용 가능",
      ],
    },
    {
      image: DLA_DL_Image,
      imageStyle: "object-contain",
      name: "원형 Low Angle 조명",
      type: "DIRECT LIGHTNING",
      series: ["DLA", "DL"],
      description: "물체의 엣지추출, 광택물체 크랙검사",
      series_features: [
        {
          name: "DLA2",
          features:
            "FPCB 채택 최적의 경사 각도를 만들어 Low Angle로 조사하여 Edge 추출, 금속 면의 각인, Crack 등의 검사에 최적",
        },
        {
          name: "DL",
          features: "두께 12mm의 박형 설계, Low Angle 타입",
        },
      ],
    },
    {
      image: DB_DBZ_DBS_Image,
      imageStyle: "object-cover",
      name: "Bar Light",
      type: "DIRECT LIGHTNING",
      series: ["DB", "DBZ", "DBS"],
      description: "고밀도이면서 콤팩트한 조명",
      features: [
        "고휘도의 LED를 고밀도로 배치한 바 조명",
        "조사 각도를 자유롭게 설정 가능하며 광범위한 용도로 이용가능",
      ],
    },
    {
      image: IFRK_Image,
      imageStyle: "object-contain",
      name: "면발광 원형조명",
      type: "INDIRECT LIGHTNING",
      series: ["IFRK"],
      description: "상부로부터 확산 광을 균일하게 조사",
      features: [
        "상부로부터의 면 발광으로 균일하게 조사",
        "구형태의 발광면으로부터 다양한 각도의 광을 조사",
      ],
    },
    {
      image: ILA_Image,
      imageStyle: "object-contain",
      name: "원형/사각형 Low Angle 조명",
      type: "INDIRECT LIGHTNING",
      series: ["ILA"],
      description: "측면으로부터 확산 광을 균일하게 조사",
      series_features: [
        {
          name: "ILA-R",
          features:
            "원형 low Angle 조명, 고르고 균일한 발광면 실현, 낮은 각도에서부터 확산광으로 균일하게 조사",
        },
        {
          name: "ILA-S",
          features:
            "사각형 Low Angle 조명, 초박형 조명을 4면에 배치하고 균일한 확산광 조사",
        },
      ],
    },
    {
      image: IDM_Image,
      imageStyle: "object-contain",
      name: "돔형 무영 조명",
      type: "INDIRECT LIGHTNING",
      series: ["IDM"],
      description: "고면상태의 광택 물체 검사",
      features: [
        "번 방향으로부터 균일한 광을 조사",
        "물체의 평면, 곡면에 한정하지 않고 광을 균일하게 조사",
        "전방향으로부터 균일한 무영 확산광으로 곡면 상태에서 광택이 있는 물체를 균일하게 조사",
      ],
    },
    {
      image: IFS_Image,
      imageStyle: "object-cover",
      name: "플랫 조명",
      type: "INDIRECT LIGHTNING",
      series: ["IFS"],
      description: "물체를 실루엣으로 검사",
      features: ["고휘도 LED를 사용한 고밀도 플랫조명"],
    },
    {
      image: DDM_Image,
      imageStyle: "object-contain",
      name: "돔형 직사 조명",
      type: "DIRECT LIGHTNING",
      series: ["DDM"],
      description: "돔형태의 라인스캔 조명",
      features: [
        "돔형태의 직사 조명으로 다양한 방향에서의 직접 조사하기 때문에 불규칙한 형태의 대상을 균일하게 조사할 수 있다.",
      ],
    },
    {
      image: ICFV_Image,
      imageStyle: "object-contain",
      name: "동축 조명",
      type: "INDIRECT LIGHTNING",
      series: ["ICFV"],
      description: "경면 물체를 고르고 균일하게 조사",
      features: [
        "렌즈와 동축 상으로 조사",
        "광을 반사하는 경면 상태의 물체에 최적",
        "제품이 다양하게 준비되어 있어 용도에 맞게 선택 가능",
      ],
    },
  ];

  return (
    <div className="mb-16 flex flex-col">
      <p className="border-main text-gray600 mb-[60px] border-l px-5">
        조명은 요청 사항에 따라 커스터마이징하여 제작이 가능합니다. 문의 요청
        부탁드리겠습니다.
      </p>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-10">
        {LIGHT_TYPE_LIST.map(
          ({
            name,
            image,
            type,
            series,
            description,
            features,
            series_features,
            imageStyle,
          }) => (
            <div
              key={name}
              className="flex w-[334px] flex-col sm:w-[322px] md:w-[359px]"
            >
              <div className="relative h-[220px]">
                <h4 className="bg-main absolute w-fit p-2.5 text-sm font-semibold text-white">
                  {name}
                </h4>
                <Image
                  src={image}
                  alt={`${name} Image`}
                  width={359}
                  height={220}
                  className={cn("size-full", imageStyle)}
                />
              </div>
              <div className="bg-gray100 flex flex-col px-[30px] py-5 sm:h-[320px] md:h-[300px]">
                <p className="text-main text-sm">{type}</p>
                <div className="text-gray600 mb-2.5 flex items-center gap-2.5">
                  {series.map((value, index) => (
                    <Fragment key={value}>
                      <span className="text-2xl font-bold">{value}</span>
                      {series.length - 1 !== index && (
                        <div className="border-gray600 h-5 border-l" />
                      )}
                    </Fragment>
                  ))}
                  <span className="text-2xl">Series</span>
                </div>
                <p className="text-gray600 font-semibold">{description}</p>
                <hr className="border-gray400 my-5" />
                {features && (
                  <ul className="list-disc gap-2.5 pl-4">
                    {features.map((feature, index) => (
                      <li className="text-gray600 text-sm" key={index}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                {series_features && (
                  <ul className="flex flex-col gap-2.5">
                    {series_features.map(({ name, features }) => (
                      <li
                        key={name}
                        className="text-gray600 flex items-center gap-2.5"
                      >
                        <p className="flex flex-col items-center bg-white px-2.5 py-[15px] leading-none">
                          <span className="font-bold">{name}</span>
                          series
                        </p>
                        <p className="text-sm">{features}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default page;
