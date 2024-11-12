import { createContext, useState } from "react"

export const Menu = createContext(true)

const MenuContex = ({children}) => {
    const [isOpen , setIsOpen] = useState(true)

    return <Menu.Provider  value={{isOpen , setIsOpen}}>
    {children}
    </Menu.Provider>

}

export default MenuContex
