import { redirect } from 'next/navigation';

// Redirect /[category]/page/[page] to /[category]?page=[page]
export default async function CategoryPageRedirect({
  params,
}: {
  params: Promise<{ category: string; page: string }>;
}) {
  const { category, page } = await params;
  redirect(`/${category}?page=${page}`);
}
