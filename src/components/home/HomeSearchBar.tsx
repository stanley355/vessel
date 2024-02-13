'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaMagnifyingGlass, FaBed, FaLocationDot } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import classNames from "classnames";

interface IHomeSearchBarMenu {
  title: string,
  icon: React.ReactNode,
  label: string,
  placeholder: string
}

const HomeSearchBar = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const HOME_SEARCH_BAR_MENU = [
    {
      title: "Where To?",
      icon: <FaMagnifyingGlass />,
      label: "Search",
      placeholder: "Places to go, things to do, hotels..."
    },
    {
      title: "Stay somewhere Great",
      icon: <FaBed />,
      label: "Hotels",
      placeholder: "Hotel name or destination"
    },
    {
      title: "Find Places to Eat",
      icon: <ImSpoonKnife />,
      label: "Restaurants",
      placeholder: "Restaurants or Destination"
    },
    {
      title: "Place that you belong to",
      icon: <FaLocationDot />,
      label: "Destinations",
      placeholder: "Place that you belong to"
    },
  ]

  const handleAction = (formData: FormData) => {
    const query = formData.get("search_query");
    if (query) {
      router.push(`/search?query=${query}`);
      return;
    }
  }


  return (
    <div className="mt-4 lg:w-1/2 lg:mx-auto">
      <h1 className="text-center text-5xl font-bold mb-16 hidden lg:block">{HOME_SEARCH_BAR_MENU[activeIndex].title}</h1>
      <div className="flex items-center justify-evenly">
        {HOME_SEARCH_BAR_MENU.map((menu: IHomeSearchBarMenu, index: number) =>
          <button type="button"
            key={menu.label}
            onClick={() => setActiveIndex(index)}
            className={classNames("flex gap-1 items-center pb-1 lg:text-xl", index === activeIndex ? "border-b-2 border-black font-semibold" : "")}>
            {menu.icon}
            {menu.label}
          </button>)}
      </div>
      <form action={handleAction} className="p-4 border w-[95%] mx-auto mt-4 rounded-md shadow-lg lg:flex lg:items-center lg:justify-between lg:rounded-full lg:p-1 lg:pl-4">
        <div className="flex items-center border-b gap-2 lg:border-none lg:w-[85%]">
          <FaMagnifyingGlass />
          <input type="text" name="search_query" id="search_query_input" className="py-2 focus:outline-none lg:w-full" placeholder={HOME_SEARCH_BAR_MENU[activeIndex].placeholder} />
        </div>
        <button type="submit" className="mt-4 w-full bg-emerald-300 py-2 rounded-lg cursor-pointer lg:w-[15%] lg:mt-0 lg:rounded-full">Search</button>
      </form>

    </div>
  )
}

export default HomeSearchBar