import { Contact } from "@humming-vision/shared";
import cn from "libs/cn";
import { formatDate } from "utils/date";

type ContactCardViewProps = {
  data: Contact;
  handleContactModalOpen: (data: Contact) => Promise<void>;
  handleDeleteContact: (id: number) => Promise<void>;
};

function ContactCardView({
  data,
  handleContactModalOpen,
  handleDeleteContact,
}: ContactCardViewProps) {
  return (
    <li
      className={cn(
        "flex w-full flex-col gap-2.5 rounded-[3px] p-5",
        data.isRead
          ? "bg-gray100"
          : "bg-background shadow-[0px_0px_10px_rgba(0,0,0,0.15)]",
      )}
    >
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
          <button
            onClick={() => handleContactModalOpen(data)}
            className="bg-main px-4 py-1 text-xs text-white"
          >
            상세
          </button>
          <button
            onClick={() => handleDeleteContact(data.id)}
            className="bg-gray300 px-4 py-1 text-xs text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
}

export default ContactCardView;
