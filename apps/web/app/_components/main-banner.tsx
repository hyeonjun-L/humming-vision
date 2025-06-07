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
    <section className="relative h-[300px] w-full md:h-[600px] lg:h-[812px]">
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </section>
  );
}

export default MainBanner;
