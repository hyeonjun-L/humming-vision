import Image from "next/image";
import {
  adapterImage,
  converterImage,
  filterImage,
} from "public/accessory/index";

function Converter() {
  const CONVERTER_LIST = [
    {
      image: converterImage,
      imageStyle: "object-cover",
      name: "Converter",
      description: `C마운트 렌즈에 장착하여 간단한 방법으로 <br/>
배율을 변경할 수 있습니다.`,
      note: "*밝기와 분해력은 저하될 수 있습니다.",
    },
    {
      image: adapterImage,
      imageStyle: "object-contain",
      name: "접사링",
      description: `C마운트의 CCTV 렌즈와 카메라 사이에 결합하여 백포커스를 <br/>
변경함으로써 촬영 거리를 줄이거나, 배율을 확대할 수 있습니다.`,
    },
    {
      image: filterImage,
      imageStyle: "object-contain",
      name: "Filter",
      description: `TCL Lens, CCTV Lens, Macro lens의 전면에 설치하여 <br/>
파장을 제한하거나 투과율을 조절할 수 있습니다. <br/>
요청 사항에 맞는 편광, 투과, 파장 제한에 적합한 솔루션을 <br/>
제공할 수 있습니다.`,
    },
  ];

  return (
    <dl className="mb-16 flex flex-col gap-10 lg:gap-0">
      {CONVERTER_LIST.map(({ image, name, description, note, imageStyle }) => (
        <div key={name} className="flex flex-col lg:h-[240px] lg:flex-row">
          <dt className="bg-main mb-3 w-fit px-5.5 py-[3px] text-xl font-bold text-white lg:hidden">
            {name}
          </dt>
          <dd className="flex flex-col lg:flex-row lg:gap-0">
            <div className="relative mb-3 h-[209px] w-[318px] flex-shrink-0 sm:w-[415px] lg:mb-0 lg:h-full lg:w-[476px]">
              <div className="absolute top-[55%] left-0 h-40 w-11/12 -translate-y-1/2 transform rounded-r-full bg-[#F5F5FC]" />

              <div className="absolute left-5 size-full">
                <Image
                  src={image}
                  alt={`${name} 제품 이미지`}
                  sizes="(min-width: 1024px) 476px, (min-width: 768px) 415px, 318px"
                  fill
                  className={imageStyle}
                />
              </div>
            </div>
            <div className="flex h-full flex-col justify-center gap-5">
              <p className="bg-main hidden w-fit px-5.5 py-[3px] text-xl font-bold text-white lg:block">
                {name}
              </p>
              <p
                className="text-gray600"
                dangerouslySetInnerHTML={{ __html: description }}
              />
              {note && <p className="mt-2.5 text-sm">{note}</p>}
            </div>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default Converter;
