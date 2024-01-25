import Link from "next/link";
import Image from "next/image";

const Header = () => {

  return (
    <header className="border-b border-black bg-indigo-600 px-2">
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <Image src={"/next.svg"} alt="travel" width={100} height={100} className="mx-auto" />
        </Link>
        <div className="flex items-center gap-2 text-white">
          <Link href="/login" className="p-4 hover:font-bold">
            Login
          </Link>
          <Link href="/register" className="p-4 hover:font-bold">
            Register
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header;