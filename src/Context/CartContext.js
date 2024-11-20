import { createContext, useState } from "react";

export const updateCart = createContext()

export const CartContext = ( {children} ) => {
    const [ update , setUpdate ] = useState(false)

    return(
        <updateCart.Provider value={{update , setUpdate}}>
            {children}
        </updateCart.Provider>
    )

}