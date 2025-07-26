function SameSensorCamerasFallback() {
  return (
    <section className="flex flex-col items-center justify-center py-20">
      <div className="mb-[74px] flex items-center gap-5">
        <hr className="border-gray200 grow" />
        <h3 className="shrink-0 animate-pulse text-2xl font-bold text-gray-400">
          동일센서제품 불러오는 중...
        </h3>
        <hr className="border-gray200 grow" />
      </div>
      <ul className="flex justify-center gap-5">
        {Array.from({ length: 3 }).map((_, idx) => (
          <li
            key={idx}
            className="w-[360px] animate-pulse rounded-lg border border-gray-200 bg-gray-50"
          >
            <div className="relative h-[191px] w-[340px] bg-gray-200" />
            <div className="bg-gray100 h-[205px] w-full grow space-y-3 p-[30px]">
              <div className="h-4 w-1/3 rounded bg-gray-300" />
              <div className="h-6 w-2/3 rounded bg-gray-400" />
              <hr className="border-gray300 my-4" />
              <div className="h-4 w-full rounded bg-gray-300" />
              <div className="h-4 w-5/6 rounded bg-gray-300" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SameSensorCamerasFallback;
