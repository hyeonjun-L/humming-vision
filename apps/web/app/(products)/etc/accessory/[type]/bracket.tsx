import cn from "libs/cn";
import Image from "next/image";
import { bracketImage, mountImage } from "public/bracket";

function Bracket() {
  const CONVERTER_LIST = [
    {
      image: bracketImage,
      imageStyle: "object-contain",
      name: "Bracket",
      description: `카메라에 취부할 수 있는 브라켓의 경우 현장 환경에 따라 <br/>
장비의 진동, 노이즈 문제에 있어서 중요한 역할을 합니다. <br/> <br/>
허밍비젼은 고객의 요청 사항에 맞게 커스터마이징하여 <br/>
현장 환경에 맞는 브라켓을 제안할 수 있습니다.`,
    },
    {
      image: mountImage,
      imageStyle: "object-contain",
      name: "Mount",
      description: `카메라와 렌즈를 결합할 수 있는 Mount <br/> <br/>
여러가지 결합 형태의 중간 경통을 <br/>
고객의 요청 사항에 맞게 제작 가능합니다. <br/> <br/>
ex) C-Mount to F-Mount, M42-Mount to F-Mount
`,
    },
  ];

  return (
    <dl className="mb-16 flex flex-col lg:gap-20.5">
      {CONVERTER_LIST.map(({ image, name, description, imageStyle }, index) => (
        <div
          key={name}
          className={cn(
            "mb-[60px] flex flex-col gap-5 lg:mb-0 lg:h-[200px] lg:gap-5 xl:h-[224px] xl:gap-9",
            {
              "lg:flex-row": index % 2 === 0,
              "lg:flex-row-reverse": index % 2 !== 0,
            },
          )}
        >
          <div className="relative size-full h-[180px] flex-shrink-0 md:h-[224px] lg:w-[380px] xl:w-[547px]">
            <div
              className={cn(
                "absolute top-1/2 h-24 w-[90%] -translate-y-1/2 transform bg-[#F5F5FC] sm:h-32 md:h-40 md:w-[80%] lg:w-full",
                {
                  "left-0 rounded-r-full": index % 2 === 0,
                  "right-0 rounded-l-full": index % 2 !== 0,
                },
              )}
            />

            <div className="absolute top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2 lg:w-[405px]">
              <Image
                src={image}
                alt={`${name} Image`}
                fill
                sizes="(min-width: 1024px) 405px, 100vw"
                className={imageStyle}
              />
            </div>
          </div>
          <div className="flex h-full flex-col justify-center gap-5">
            <dt className="bg-main w-fit px-5.5 py-[3px] text-xl font-bold text-white">
              {name}
            </dt>
            <dd
              className="text-gray600"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      ))}
    </dl>
  );
}

export default Bracket;
