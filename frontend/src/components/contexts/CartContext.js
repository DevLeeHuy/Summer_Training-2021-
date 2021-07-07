import React, { createContext, useContext, useState, useEffect } from "react";
import cartApi from "../../api/cartApi";
import userApi from "../../api/userApi";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const { user } = useContext(UserContext);
  const [shoppingCart, setShoppingCart] = useState([]);
  useEffect(() => {
    (async () => {
      if (user) {
        const response = await userApi.shoppingCart({
          userId: user._id,
          action: "get",
        });
        if (response.success) {
          setShoppingCart(response.cart);
        }
      }
    })();
  }, [user]);

  const updateQuantity = async (productId, quantity) => {
    const newCart = shoppingCart;
    newCart.forEach((ele) => {
      if (ele.product._id === productId) {
        ele.quantity = quantity;
      }
    });
    setShoppingCart(newCart);
    await cartApi.handle({
      userId: user._id,
      productId: productId,
      quantity,
      action: "update",
    });
  };

  const shoppingCartData = {
    shoppingCart,
    updateQuantity,
  };

  return (
    <CartContext.Provider value={shoppingCartData}>
      {props.children}
    </CartContext.Provider>
  );
}
