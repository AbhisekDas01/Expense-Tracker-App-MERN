import { useState } from "react"
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from "./SideMenu";

export default function Navbar({activeMenu}) {

    const [openSidemenu, setOpenSidemenu] = useState(false);
    return (
        <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30"> 
            <button
                className="block lg:hidden text-black"
                onClick={() => setOpenSidemenu(!openSidemenu)}
            >
                {
                    openSidemenu ? (
                        <HiOutlineX className="text-2xl" />
                    ) : (
                        <HiOutlineMenu className="text-2xl" />
                    )
                }
            </button>
            
            <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

            {
                openSidemenu && (
                    <div className="fixed top-[61px] -ml-4 bg-white">
                        <SideMenu activeMenu = {activeMenu}/>
                    </div>
                )
            }

        </div>
    )
}