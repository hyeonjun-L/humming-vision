"use client";

import { useEffect, useRef } from "react";

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
        };
        const marker = new maps.Marker(markerOptions);

        const infoWindowOptions: naver.maps.InfoWindowOptions = {
          content: `
            <div style="padding: 10px; min-width: 200px;">
              <h4 style="margin: 0 0 5px 0; color: #333;">주식회사 허밍비젼</h4>
              <p style="margin: 0; color: #666; font-size: 12px;">
                TEL: 031-360-2977<br>
                FAX: 031-360-2978<br>
                Email: hmv_info@naver.com
              </p>
            </div>
          `,
        };
        const infoWindow = new maps.InfoWindow(infoWindowOptions);

        maps.Event.addListener(marker, "click", () => {
          infoWindow.open(map, location);
        });
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
