import { readdir } from "fs/promises"
import { Book } from "./Book"
import Image from "next/image"
import brooch from "/public/brooch.png"

export default async function Home() {
  const fileNames = await readdir("public/sailor-moon")
  return (
    <main>
      <Book fileNames={fileNames.slice(1, fileNames.length)} />
      <Image
        src={brooch}
        alt="Brooch"
        className="absolute z-[10000] right-0 top-0 w-28 sm:w-60 lg:w-80"
      />
    </main>
  )
}
