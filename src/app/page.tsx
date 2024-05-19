import { readdir } from "fs/promises"
import Image from "next/image"
import Link from "next/link"
import background1 from "/public/sailor-moon/background1.jpeg"
import logo from "/public/sailor-moon/logo.png"

export default async function Home() {
  const folders = (await readdir("public/sailor-moon")).filter((f) =>
    f.startsWith("book")
  )
  const data = folders.map((f) => ({
    coverImage: `/sailor-moon/${f}/cover.JPG`,
    bookName: f,
  }))

  return (
    <main className="overflow-hidden relative min-h-dvh">
      <header>
        <Image src={logo} alt={"Logo"} className="w-1/3 mx-auto" />
      </header>
      <Image
        src={background1}
        alt="background"
        className="absolute top-0 -z-10 object-fit min-h-screen w-screen opacity-50 filter hue-rotate-30 blur-sm"
        quality={100}
      />
      <section className="p-8 grid grid-rows-3 grid-flow-row grid-cols-1 lg:grid-cols-2 gap-6">
        {data.map(({ bookName, coverImage }) => (
          <Link
            href={`/books/${bookName}`}
            key={bookName}
            className="hover:scale-105 cursor-default transform-gpu transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl rounded-md overflow-hidden"
          >
            <div className="h-[450px] w-[800px]">
              <Image src={coverImage} alt={bookName} quality={100} fill />
            </div>
          </Link>
        ))}
      </section>
      <footer className="bottom-0 w-full text-center text-pink-600 bg-pink-200/40 p-1 text-sm">
        For Aina 🌙
      </footer>
    </main>
  )
}
