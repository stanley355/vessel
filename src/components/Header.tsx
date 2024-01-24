import Link from "next/link";

const Header = () => {

  return (
    <header className="border-b border-black">
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
        </Link>
        <div className="flex items-center gap-4">
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