import { createContext, useState } from "react";

export const StoreContext = createContext (null)

const StoreContextProvider = (props) => {
    const [image,setImage] = useState(true)
    const [data, setData] = useState([])
    const url = "http://localhost:4000"

const contextValue = {
    image,
    setImage,
    data, 
    setData,
    url
}

return (
    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
)
}

export default StoreContextProvider;