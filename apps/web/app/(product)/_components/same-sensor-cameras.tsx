import { CameraProduct } from "@humming-vision/shared";
import axios from "axios";
import { ENV_API_END_POINT_KEY } from "consts/env-keys.const";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { handleApiError } from "utils/api-error-handler";
import getRepresentativeImage from "utils/get-representative-image";

interface SameSensorCamerasProps {
  id: number;
  sensor: string;
}

async function SameSensorCameras({ id, sensor }: SameSensorCamerasProps) {
  const END_POINT = process.env[ENV_API_END_POINT_KEY];

  try {
    const sameSensorCameras = await axios.get<CameraProduct[]>(
      `${END_POINT}/product/camera/by-sensor/${sensor}?skipId=${id}`,
    );

    if (sameSensorCameras.data.length === 0) {
      return null;
    }

    return (
      <section className="flex flex-col">
        <div className="mb-[74px] flex items-center gap-5">
          <hr className="border-gray200 grow" />
          <h3 className="shrink-0 text-xl font-bold sm:text-2xl">
            동일센서제품
          </h3>
          <hr className="border-gray200 grow" />
        </div>
        <ul className="flex flex-wrap gap-5 px-4 md:justify-center">
          {sameSensorCameras.data.map((camera) => (
            <CameraCard key={camera.id} product={camera} />
          ))}
        </ul>
      </section>
    );
  } catch (error) {
    handleApiError(error);
    return <div className="text-red-500">비슷한 센서 카메라 로딩 실패</div>;
  }
}

export default SameSensorCameras;

interface CameraCardProps {
  product: CameraProduct;
}

function CameraCard({ product }: CameraCardProps) {
  const representativeImage = getRepresentativeImage(product.images);

  return (
    <li className="w-full sm:w-[48%] md:w-[360px]">
      <Link
        className="flex flex-col items-center gap-2.5"
        href={`/camera/${product.camera.type.toLocaleLowerCase()}/${product.id}`}
      >
        {representativeImage && (
          <div className="relative h-[170px] w-[207px] shrink-0 sm:h-[220px] sm:w-[270px] md:h-[191px] md:w-[340px]">
            {representativeImage.path ? (
              <Image
                src={representativeImage.path || ""}
                alt={product.name}
                fill
                sizes="(min-width: 768px) 340px, (min-width: 640px) 270px, 207px"
                priority
                className="object-contain"
              />
            ) : (
              <ImageIcon className="size-full text-gray-300" />
            )}
          </div>
        )}
        <div className="text-gray600 bg-gray100 h-[214px] w-full grow p-[30px] md:h-[205px]">
          <p className="text-main text-sm">{product.camera.maker}</p>
          <h4 className="truncate text-xl font-bold md:text-2xl">
            {product.name}
          </h4>
          <hr className="border-gray400 my-5" />
          <p className="line-clamp-3 text-sm md:line-clamp-2">
            {product.mainFeature}
          </p>
        </div>
      </Link>
    </li>
  );
}
