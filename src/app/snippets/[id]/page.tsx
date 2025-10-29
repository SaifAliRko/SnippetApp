import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SnippetShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function SnippetShowPage({
  params,
}: SnippetShowPageProps) {
  const { id } = await params;
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });
  if (!snippet) {
    notFound();
  }
  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold"> {snippet?.title}</h1>
        <div className="flex gap-4">
          <Link href={`/snippets/${id}/edit`} className="p-2 border rounded">
            Edit
          </Link>
          <Link href={`/snippets/${id}/delete`} className="p-2 border rounded">
            Delete
          </Link>
        </div>
      </div>

      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet?.code}</code>
      </pre>
    </div>
  );
}
