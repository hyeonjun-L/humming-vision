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
          <h3 className="shrink-0 text-2xl font-bold">동일센서제품</h3>
          <hr className="border-gray200 grow" />
        </div>
        <ul className="flex justify-center gap-5">
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
    <li className="w-[360px]">
      <Link
        className="flex flex-col items-center gap-2.5"
        href={`/camera/${product.camera.type.toLocaleLowerCase()}/${product.id}`}
      >
        {representativeImage && (
          <div className="relative h-[191px] w-[340px] shrink-0">
            {representativeImage.path ? (
              <Image
                src={representativeImage.path || ""}
                alt={product.name}
                fill
                sizes="340px"
                priority
                className="object-cover"
              />
            ) : (
              <ImageIcon className="size-full text-gray-300" />
            )}
          </div>
        )}
        <div className="text-gray600 bg-gray100 h-[205px] w-full grow p-[30px]">
          <p className="text-main text-sm">{product.camera.maker}</p>
          <h4 className="text-2xl font-bold">{product.name}</h4>
          <hr className="border-gray400 my-5" />
          <p className="line-clamp-2 text-sm">{product.mainFeature}</p>
        </div>
      </Link>
    </li>
  );
}
