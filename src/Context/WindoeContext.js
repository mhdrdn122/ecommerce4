import { createContext, useEffect, useState } from "react";

export const WindoeWidth = createContext(null)



const WindoeContext = ({children}) => {
    const [widthSize , setWisthSize ] = useState(window.innerWidth)
    
    useEffect(() => {
        const setReSizeWidth = () => {
            setWisthSize(window.innerWidth)
        }

        window.addEventListener('resize' , setReSizeWidth)

       return () => window.removeEventListener('resize' , setReSizeWidth)

    } , [])

    return <WindoeWidth.Provider  value={ {widthSize , setWisthSize} }>
        {children}
    </WindoeWidth.Provider>
}
export default WindoeContext