import { ContactSearchFieldEnum } from "@humming-vision/shared";
import ContactPage from "./_components/contact-page";
import { z } from "zod";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const ContactSearchParamsSchema = z.object({
  searchField: z
    .nativeEnum(ContactSearchFieldEnum)
    .default(ContactSearchFieldEnum.NAME),
  page: z.coerce.number().int().min(1).default(1),
  searchValue: z.string().default(""),
});

type ContactSearchParams = {
  page: number;
  searchField: ContactSearchFieldEnum;
  searchValue: string;
};

function safeParseContactSearchParams(
  searchParams: Record<string, string | undefined>,
): ContactSearchParams {
  const result = ContactSearchParamsSchema.safeParse(searchParams);

  if (result.success) {
    return result.data;
  }

  return {
    page: 1,
    searchField: ContactSearchFieldEnum.NAME,
    searchValue: "",
  };
}

async function page({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const validatedParams: ContactSearchParams =
    safeParseContactSearchParams(resolvedSearchParams);

  return <ContactPage {...validatedParams} />;
}

export default page;
