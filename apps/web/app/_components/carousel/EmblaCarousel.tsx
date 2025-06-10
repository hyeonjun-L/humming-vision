"use client";
import { EmblaOptionsType } from "embla-carousel";
import { LazyLoadImage } from "./EmblaCarouselLazyLoadImage";
import { NavButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import useEmblaCarousel from "embla-carousel-react";
import { StaticImageData } from "next/image";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "./EmblaCarouselAutoplay";
import { ArrowSVG, PlaySVG, StopSVG } from "public/svg";
import cn from "utils/cn";

type PropType = {
  slides: StaticImageData[];
  children: React.ReactNode;
  options?: EmblaOptionsType;
};

const EmblaCarousel = ({ slides, options, children }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Fade(),
    Autoplay({ playOnInit: true, delay: 3300 }),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="size-full">
      <div className="size-full overflow-hidden" ref={emblaRef}>
        <div className="flex size-full touch-pan-y touch-pinch-zoom">
          {slides.map((image, index) => (
            <LazyLoadImage key={index} index={index} imgSrc={image.src} />
          ))}
        </div>
      </div>

      <div className="fill-gray100 stroke-gray100 absolute top-1/2 left-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col">
        {children}
        <div className="flex w-full justify-center">
          <div className="flex gap-4">
            <button onClick={toggleAutoplay} type="button">
              {autoplayIsPlaying ? (
                <StopSVG className="size-6" />
              ) : (
                <PlaySVG className="size-6" />
              )}
            </button>

            <NavButton
              onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
              disabled={prevBtnDisabled}
            >
              <ArrowSVG className="size-5 rotate-180" />
            </NavButton>

            <div className="flex flex-1 items-center justify-center gap-4">
              {scrollSnaps.map((_, index) => (
                <DotButton key={index} onClick={() => onDotButtonClick(index)}>
                  <div
                    className={cn(
                      "bg-gray100/30 size-2.5 rounded-full",
                      index === selectedIndex && "bg-gray100",
                    )}
                  />
                </DotButton>
              ))}
            </div>

            <NavButton
              onClick={() => onAutoplayButtonClick(onNextButtonClick)}
              disabled={nextBtnDisabled}
            >
              <ArrowSVG className="size-5" />
            </NavButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
