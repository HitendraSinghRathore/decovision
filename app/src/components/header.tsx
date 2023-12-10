import { Dancing_Script, Montserrat } from "next/font/google";
import Link from "next/link";
import Spinner from "./spinner";

const danceScript = Dancing_Script({
    subsets: ['latin'],
    weight:['700']
  })
  const montersat = Montserrat({
    subsets: ['latin'],
    weight:['400','700',],
    variable: '--font-nunito'
  })
export default function Header(props:any) {
    return (
<header className={`bg-dark1 w-full ${montersat.className}`}>
<nav className="p-4 lg:p-6 flex justify-between shadow sticky">
  <div className="flex">
  <Link href="/">
    <p className={`text-3xl ${danceScript.className} hover:text-brandBlueLight`}>RoomRemix</p>
  </Link>
  </div>
  <button className={`btn rounded-md px-4 py-2 bg-brandBlue hover:opacity-75 active:opacity-50 text-primaryWhite text-sm disabled:text-primaryWhite disabled:bg-gray-700 disabled:pointer-events-none`} disabled={props.disabled} onClick={() => props.generate()}>
    {props.loader ? <div className="flex"><Spinner></Spinner></div>: 'Generate'}
  </button>
</nav>

</header>
    )
}