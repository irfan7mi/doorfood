import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "https://doorfood-app-server-98ey71h4u-irfans-projects-878c5a63.vercel.app";
  const [logIn, setLogIn] = useState(false);
  const [cartItem, setCartItem] = useState(() => {
    const savedCart = localStorage.getItem("cartItem");
    return savedCart ? JSON.parse(savedCart) : {};
  }); // Initialize from localStorage
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [category, setCategory] = useState("All");

  // Fetch food list from the server
  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const response = await axios.get(`${url}/food/list`);
        if (response.data.success) {
          setFoodList(response.data.data || []);
        } else {
          console.error("Failed to fetch foods: ", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching foods:", error);
        setFoodList([]); // Set an empty list to prevent errors
      }
    };

    fetchFoodList();
  }, []);

  // Save cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  // Add item to the cart
  const addToCart = async (itemId) => {
    if (logIn) {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    }
    else toast.error("SignIn your account!");
    if (token) {
      const response = await axios.post(url + "/cart/add", { itemId, email });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  };

  // Remove item from the cart
  const removeFromCart = async (itemId) => {
    setCartItem((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });

    if (token) {
      const response = await axios.post(url + "/cart/remove", { itemId, email });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    }
  };

  // Calculate total amount from the cart
  const totalFromCart = () => {
    let totalAmount = 0;

    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        } else {
          console.warn(`Item with ID ${item} not found in food_list.`);
        }
      }
    }
    return totalAmount;
  };

  // Payment process
  const processPayment = async (paymentDetails) => {
    try {
      const response = await axios.post(`${url}/payment`, {
        userId,
        email,
        items: cartItem,
        amount: totalFromCart(),
        paymentDetails,
      });

      if (response.data.success) {
        toast.success("Payment successful!");
        setCartItem({}); // Reset the cart after successful payment
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Error processing payment. Please try again.");
    }
  };

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const contextValue = {
    logIn,
    setLogIn,
    userId,
    setUserId,
    food_list,
    url,
    cartItem,
    token,
    setToken,
    setEmail,
    setCartItem,
    addToCart,
    removeFromCart,
    totalFromCart,
    category,
    setCategory,
    processPayment,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;