import { Actions } from "./actions"
import { Logo } from "./logo"
import { Search } from "./search"


export const Navbar = () => {
  return(
    <nav className="w-full h-20 z-[49] bg-[#252731] fixed top-0 px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      <Search />
      <Actions />
    </nav>
  )
} 