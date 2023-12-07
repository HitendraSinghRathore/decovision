
import { Montserrat } from "next/font/google";
import Image from "next/image";
const montersat = Montserrat({
  subsets: ['latin'],
  weight:['400','700',],
  variable: '--font-nunito'
})

export default function Home() {
  return (
    <main className={montersat.className}>
      <h1 >Called</h1>
      <Image
        src="/images/s.png"
        alt="dummy"
        width="30"
        height="30"
      ></Image>
    </main>
  )
}
