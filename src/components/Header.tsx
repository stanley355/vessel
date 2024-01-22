import Link from "next/link";

const Header = () => {

  return (
    <header className="">
      <nav className="container border border-black mx-auto">
        <Link href="/">
          <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
        </Link>
      </nav>
    </header>
  )
}

export default Header;