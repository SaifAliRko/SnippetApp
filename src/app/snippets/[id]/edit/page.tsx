import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/snippet-edit-form";

interface SnippetEditPageProps {
  params: Promise<{ id: string }>;
}
export default async function SnippetEditPage({
  params,
}: SnippetEditPageProps) {
  const id = (await params).id;
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });
  if (!snippet) {
    notFound();
  }
  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
