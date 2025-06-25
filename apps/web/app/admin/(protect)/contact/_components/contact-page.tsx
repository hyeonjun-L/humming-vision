"use client";
import Table from "components/table";
import {
  Contact,
  ContactSearchFieldEnum,
  GetContactQuery,
  GetContactResponse,
} from "@humming-vision/shared";
import { type ColumnDef } from "@tanstack/react-table";
import Pagination from "components/pagination";
import { useState } from "react";
import { SelectBox } from "components/select-box/select-box";
import { SearchInput } from "components/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { publicApi } from "libs/axios";
import ContactCardView from "./contact-card-view";
import { useModalStore } from "stores/use-modal.store";
import { ModalEnum } from "consts/modal.const";

function ContactPage() {
  const TAKE = 12;

  const openModal = useModalStore((state) => state.openModal);
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchField, setSearchField] = useState<ContactSearchFieldEnum>(
    ContactSearchFieldEnum.NAME,
  );

  const [activeSearchField, setActiveSearchField] =
    useState<ContactSearchFieldEnum>(ContactSearchFieldEnum.NAME);
  const [activeSearchValue, setActiveSearchValue] = useState<string>("");

  const handleMarkAsRead = async (id: number) => {
    try {
      await publicApi.patch(`/api/contact/read?id=${id}`);

      queryClient.setQueryData(
        ["contacts", currentPage, activeSearchField, activeSearchValue],
        (oldData: GetContactResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.map((contact) =>
              contact.id === id ? { ...contact, isRead: true } : contact,
            ),
          };
        },
      );
    } catch (error) {
      console.error("Failed to mark contact as read:", error);
    }
  };

  const handleContactModalOpen = async (contactData: Contact) => {
    if (contactData.isRead === false) {
      await handleMarkAsRead(contactData.id);
    }

    openModal(ModalEnum.CONTACT, { data: contactData });
  };

  const getContacts = async (page: number) => {
    const params: GetContactQuery = {
      page,
      take: TAKE,
      order__createdAt: "DESC",
    };

    if (activeSearchValue.trim()) {
      params[activeSearchField] = activeSearchValue.trim();
    }

    const response = await publicApi.get<GetContactResponse>(`/api/contact`, {
      params,
    });

    return response.data;
  };

  const handleSearch = (value: string) => {
    setActiveSearchField(searchField);
    setActiveSearchValue(value);
    setCurrentPage(1);
  };

  const { data: contactData, isLoading } = useQuery({
    queryKey: ["contacts", currentPage, activeSearchField, activeSearchValue],
    queryFn: () => getContacts(currentPage),
  });

  const columns: ColumnDef<Contact>[] = [
    {
      accessorKey: "id",
      header: "NO",
    },
    {
      accessorKey: "name",
      header: "이름",
    },
    {
      accessorKey: "subject",
      header: "제목",
    },
    {
      accessorKey: "email",
      header: "연락처",
    },
    {
      accessorKey: "createdAt",
      header: "등록일자",
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return date.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      accessorKey: "management",
      header: "관리",
      cell: ({ row }) => {
        const contact = row.original;
        return (
          <div className="flex justify-center gap-2">
            <button
              className="bg-main px-4 py-1 whitespace-nowrap text-white"
              onClick={() => handleContactModalOpen(contact)}
            >
              상세
            </button>
            <button
              className="bg-gray300 px-4 py-1 whitespace-nowrap text-white"
              onClick={() => alert(`삭제: ${contact.id}`)}
            >
              삭제
            </button>
          </div>
        );
      },
    },
  ];

  const selectOptions = [
    { value: ContactSearchFieldEnum.NAME, label: "이름" },
    { value: ContactSearchFieldEnum.EMAIL, label: "이메일" },
    { value: ContactSearchFieldEnum.SUBJECT, label: "제목" },
    { value: ContactSearchFieldEnum.COMPANY, label: "회사" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-5 py-33 sm:pb-0 md:px-10">
      <hr className="border-gray200 absolute left-0 w-screen border-t" />
      <div className="border-main flex flex-wrap justify-between gap-5 border-b py-5.5 sm:gap-0">
        <h2 className="text-main text-2xl font-bold">제품문의</h2>
        <div className="flex gap-5">
          <SelectBox
            options={selectOptions}
            selectLabel="검색 필드"
            defaultValue={searchField}
            onValueChange={(value) =>
              setSearchField(value as ContactSearchFieldEnum)
            }
          />
          <SearchInput
            placeholder="검색어를 입력해주세요"
            className="sm:w-[309px]"
            onSubmit={handleSearch}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-10">로딩 중...</div>
      ) : (
        <>
          <Table data={contactData?.data || []} columns={columns} />
          <ul className="mt-5 flex flex-col gap-2.5 sm:hidden">
            {contactData?.data.map((contact) => (
              <ContactCardView
                key={contact.id}
                data={contact}
                handleContactModalOpen={handleContactModalOpen}
              />
            ))}
          </ul>
        </>
      )}
      <div className="mt-8 flex w-full justify-center">
        <Pagination
          currentPage={currentPage}
          take={TAKE}
          total={contactData?.total || 0}
          onPageChange={(page: number) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </main>
  );
}

export default ContactPage;
