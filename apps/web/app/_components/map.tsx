"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";

function Map() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && window.naver && window.naver.maps) {
        const { maps } = window.naver;

        const location = new maps.LatLng(37.3920487, 126.9717455);

        const mapOptions: naver.maps.MapOptions = {
          center: location,
          zoom: 17,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: maps.MapTypeControlStyle.BUTTON,
            position: maps.Position.TOP_RIGHT,
            mapTypeIds: [
              maps.MapTypeId.NORMAL,
              maps.MapTypeId.TERRAIN,
              maps.MapTypeId.SATELLITE,
              maps.MapTypeId.HYBRID,
            ],
          },
          zoomControl: true,
          zoomControlOptions: {
            style: maps.ZoomControlStyle.LARGE,
            position: maps.Position.TOP_LEFT,
          },
        };

        const map = new maps.Map(mapRef.current, mapOptions);

        const markerOptions: naver.maps.MarkerOptions = {
          position: location,
          map: map,
          title: "주식회사 허밍비젼",
          icon: {
            content: `<svg width="30" height="38" viewBox="0 0 30 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 10.75C13.8065 10.75 12.6623 11.2244 11.8184 12.0684C10.9744 12.9123 10.5 14.0565 10.5 15.25C10.5 16.14 10.7643 17.01 11.2588 17.75C11.7533 18.49 12.4561 19.0667 13.2783 19.4072C14.1005 19.7477 15.0051 19.8367 15.8779 19.6631C16.7508 19.4894 17.5523 19.061 18.1816 18.4316C18.8109 17.8023 19.2394 17.0008 19.4131 16.1279C19.5867 15.2551 19.4977 14.3505 19.1572 13.5283C18.8167 12.7061 18.24 12.0033 17.5 11.5088C16.76 11.0143 15.89 10.75 15 10.75ZM29.25 15.25C29.25 21.3072 26.0365 26.5839 22.8135 30.3594C19.5835 34.1429 16.2872 36.4852 16.0029 36.6836L16.002 36.6826C15.708 36.8882 15.3587 37 15 37C14.641 37 14.2912 36.8885 13.9971 36.6826V36.6836C13.7128 36.4852 10.4165 34.1429 7.18652 30.3594C3.96348 26.5839 0.75 21.3072 0.75 15.25V15.249L0.754883 14.8955C0.849502 11.246 2.34089 7.76653 4.92871 5.17871C7.59997 2.50745 11.2213 1.00439 14.999 1H15.001L15.3545 1.00488C19.004 1.0995 22.4835 2.59089 25.0713 5.17871C27.7425 7.84997 29.2456 11.4713 29.25 15.249V15.25Z" fill="#00319B" stroke="white"/>
                    </svg>`,
            anchor: new maps.Point(10, 20),
          },
        };
        const marker = new maps.Marker(markerOptions);

        const infoWindowOptions: naver.maps.InfoWindowOptions = {
          content: InfowindowContants(),
          disableAnchor: true,
          backgroundColor: "transparent",
          borderWidth: 0,
          pixelOffset: new maps.Point(5, -5),
        };
        const infoWindow = new maps.InfoWindow(infoWindowOptions);

        infoWindow.open(map, marker);
      }
    };

    if (window.naver) {
      initMap();
    } else {
      const checkNaver = setInterval(() => {
        if (window.naver) {
          clearInterval(checkNaver);
          initMap();
        }
      }, 100);

      return () => clearInterval(checkNaver);
    }
  }, []);

  return (
    <div className="my-16 h-[442px] w-full rounded-lg border border-gray-200 xl:pl-16">
      <div className="bg-background absolute left-0 h-[600px] w-screen"></div>
      <div ref={mapRef} className="z-20 mt-20 size-full" />
    </div>
  );
}

export default Map;

const InfowindowContants = () => {
  return ReactDOMServer.renderToString(
    <div className="text-gray600 flex flex-col items-center justify-center gap-1 rounded-md bg-white p-4 shadow-[0px_1px_4px_rgba(0,0,0,0.25)]">
      <h5 className="font-semibold">허밍비젼</h5>
      <p className="text-center text-xs">
        경기도 안양시 흥안대로 427번길 47
        <br /> 인덕원 LDC비즈타워
      </p>
      <div className="mt-3 flex gap-4 whitespace-nowrap">
        <Link
          href="https://map.naver.com/p/directions/-/14134437.2009044,4493895.344556,%ED%97%88%EB%B0%8D%EB%B9%84%EC%A0%BC,1333829205,PLACE_POI/-/transit?c=18.55,0,0,0,dh"
          target="_blank"
          className="flex items-center gap-2 rounded-md border-2 border-green-500 p-1 text-xs hover:bg-green-500"
        >
          <div className="relative size-5">
            <Image
              src="https://ssl.pstatic.net/static/maps/assets/icons/favicon.ico"
              alt="naver map icon"
              fill
            />
          </div>
          네이버 길찾기
        </Link>
        <Link
          href="https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=,,493755.0000000003,1081322.0000000007&rt1=&rt2=LDC%EB%B9%84%EC%A6%88%ED%83%80%EC%9B%8C&rtIds=,1388091461"
          target="_blank"
          className="flex items-center gap-2 rounded-md border-2 border-yellow-300 p-1 text-xs hover:bg-yellow-300"
        >
          <div className="relative size-4 sm:size-6">
            <Image
              src="https://map.kakao.com/favicon.ico"
              alt="kakao map icon"
              fill
            />
          </div>
          카카오 길찾기
        </Link>
      </div>
    </div>,
  );
};
