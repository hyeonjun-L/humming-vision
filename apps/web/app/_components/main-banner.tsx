import EmblaCarousel from "@/_components/carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import {
  mainBannerImage1,
  mainBannerImage2,
  mainBannerImage3,
} from "public/main";

const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };
const SLIDES = [mainBannerImage1, mainBannerImage2, mainBannerImage3];

function MainBanner() {
  return (
    <section className="relative h-[300px] w-full text-white md:h-[600px] lg:h-[812px]">
      <EmblaCarousel slides={SLIDES} options={OPTIONS}>
        <div className="mb-16 flex w-full flex-col items-center gap-2 overflow-hidden">
          <p className="text-gray100 font-gotham animate-fade-in-up motion-safe:animate-fade-in-up text-[22px] tracking-widest opacity-0 transition-all duration-700 [animation-delay:0.1s] [animation-fill-mode:forwards] motion-reduce:animate-none">
            HUMMING VISION
          </p>
          <p className="font-gotham animate-fade-in-up motion-safe:animate-fade-in-up text-[50px] font-bold opacity-0 transition-all duration-700 [animation-delay:0.3s] [animation-fill-mode:forwards] motion-reduce:animate-none">
            We enjoy MORE than vision
          </p>
          <p className="animate-fade-in-up motion-safe:animate-fade-in-up text-4xl font-bold opacity-0 transition-all duration-700 [animation-delay:0.5s] [animation-fill-mode:forwards] motion-reduce:animate-none">
            혁신적인 시각 솔루션, 그 이상을 실현합니다
          </p>
        </div>
      </EmblaCarousel>
      <div className="pointer-events-none absolute inset-0 w-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_52%,rgba(0,0,0,0)_100%)] opacity-70" />
    </section>
  );
}

export default MainBanner;
