import Link from "next/link";
import Image from "next/image";

const Navigation = () => {
  return (
    <nav className="container p-2 flex justify-between items-center">
      <Link href="/">
        <Image src={"/next.svg"} alt="travel" width={100} height={100} className="mx-auto" />
      </Link>
      <Link href="/login" className="bg-teal-500 text-white font-bold rounded-lg p-2">
        Login
      </Link>
    </nav>
  )
}

export default Navigation;