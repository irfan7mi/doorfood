import { createContext, useState } from "react";

export const StoreContext = createContext (null)

const StoreContextProvider = (props) => {
    const [image,setImage] = useState(true)
    const [data, setData] = useState([])
    const url = "https://doorfood-app-server-98ey71h4u-irfans-projects-878c5a63.vercel.app"

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