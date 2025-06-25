import { Contact } from "@humming-vision/shared";
import { formatDate } from "utils/date";

function ContactCardView({ data }: { data: Contact }) {
  return (
    <li className="flex w-full flex-col gap-2.5 rounded-[3px] bg-white p-5 shadow-[0px_0px_10px_rgba(0,0,0,0.15)] dark:bg-gray-800">
      <div className="flex items-center gap-2.5">
        <p className="text-gray600 flex-shrink-0 text-sm">{data.id}</p>
        <p
          className="border-gray200 text-gray400 max-w-[80px] truncate border-x px-2.5 text-xs"
          title={data.name}
        >
          {data.name}
        </p>
        <p
          className="text-gray400 min-w-0 flex-1 truncate text-xs"
          title={data.email}
        >
          {data.email}
        </p>
      </div>
      <p className="text-gray600 truncate text-sm" title={data.subject}>
        {data.subject}
      </p>
      <div className="border-gray200 flex items-end justify-between border-t pt-2.5">
        <p className="text-gray400 flex-shrink-0 text-xs">
          {formatDate(data.createdAt)}
        </p>
        <div className="flex flex-shrink-0 gap-2">
          <button className="bg-main px-4 py-1 text-xs text-white">상세</button>
          <button className="bg-gray300 px-4 py-1 text-xs text-white">
            삭제
          </button>
        </div>
      </div>
    </li>
  );
}

export default ContactCardView;
