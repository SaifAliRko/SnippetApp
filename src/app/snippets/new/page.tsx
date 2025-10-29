import { db } from "@/db";
import { redirect } from "next/navigation";

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    //this needs to be a server action
    "use server";
    // check the user's inputs and make sure they are valid
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    // create a new record in the database
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    console.log(snippet);
    // redirect the user to the root route page
    redirect("/");
  }
  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            className="border rounded p-2 w-full"
            type="text"
            id="title"
            name="title"
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            className="border rounded p-2 w-full"
            id="code"
            name="code"
          />
        </div>
        <button className="bg-blue-200 rounded p-2">Create</button>
      </div>
    </form>
  );
}
