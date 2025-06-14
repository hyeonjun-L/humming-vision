import Image from "next/image";

type PropType = {
  imgSrc: string;
  index: number;
};

export const LazyLoadImage = (props: PropType) => {
  const { imgSrc, index } = props;

  return (
    <div className="min-w-0 flex-[0_0_100%] transform-gpu">
      <div className="relative size-full">
        <Image
          src={imgSrc}
          alt=""
          fill
          className="object-cover"
          data-src={imgSrc}
          priority={index === 0}
        />
      </div>
    </div>
  );
};
