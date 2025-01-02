import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext (null)

const StoreContextProvider = (props) => {
    const [image,setImage] = useState(true)
    const [showLogIn, setShowLogIn] = useState(true)
    const [token, setToken] = useState("");
    const [data, setData] = useState([])
    const url = "http://localhost:4000"

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
          setToken(savedToken);
        }
      }, []);

const contextValue = {
    image,
    setImage,
    data, 
    setData,
    token, 
    setToken,
    showLogIn, 
    setShowLogIn,
    url
}

return (
    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
)
}

export default StoreContextProvider;