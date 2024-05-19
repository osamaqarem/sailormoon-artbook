import Image from "next/image"
import brooch from "/public/sailor-moon/brooch.png"
import Link from "next/link"

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Link href={"/"} className="absolute z-[10000] right-0 top-0 ">
        <Image
          src={brooch}
          alt="Brooch"
          className="w-28 sm:w-60 lg:w-80 hover:scale-105 transition-all transform-gpu"
        />
      </Link>
      {children}
    </>
  )
}
