import { db } from "@/db";
import Link from "next/link";

interface Snippet {
  id: number;
  title: string;
  code: string;
}
export default async function Home() {
  const snippets = await db.snippet.findMany();
  const renderedSnippets = snippets.map((snippet: Snippet) => (
    <Link
      key={snippet.id}
      href={`/snippets/${snippet.id}`}
      className="flex justify-between items-center p-2 border rounded"
    >
      <div>{snippet.title}</div>
      <div>View</div>
    </Link>
  ));
  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="block p-2 border rounded">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
