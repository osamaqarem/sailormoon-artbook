import { readdir } from "fs/promises"
import { Book } from "./Book"

export default async function Page({ params }: { params: { id: string } }) {
  const fileSources = (await readdir(`public/sailor-moon/${params.id}`))
    .filter((f) => f.startsWith("JPEG"))
    .map((f) => `/sailor-moon/${params.id}/${f}`)

  return (
    <main>
      <Book fileSources={fileSources} />
    </main>
  )
}

export async function generateStaticParams() {
  const folders = (await readdir("public/sailor-moon")).filter((f) =>
    f.startsWith("book")
  )
  return Promise.all(
    folders.map(async (folder) => ({
      id: folder,
    }))
  )
}
