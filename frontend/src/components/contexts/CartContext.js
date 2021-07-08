import React, { createContext, useContext, useState, useEffect } from "react";
import cartApi from "../../api/cartApi";
import userApi from "../../api/userApi";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const { user } = useContext(UserContext);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  useEffect(() => {
    (async () => {
      if (user._id) {
        const response = await userApi.shoppingCart({
          userId: user._id,
          action: "get",
        });
        if (response.success) {
          setShoppingCart(response.cart);
        }
      }
    })();
    return () => {
      setShoppingCart([]);
    };
  }, [user._id]);

  useEffect(() => {
    if (shoppingCart.length > 0)
      setTotalCost(
        shoppingCart.reduce(
          (acc, item) => (acc += item.product.price * item.quantity),
          0
        )
      );
  }, [shoppingCart]);

  const updateQuantity = async (productId, quantity) => {
    const newCart = [...shoppingCart];
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

  const removeItem = async (productId) => {
    const newCart = [...shoppingCart];
    const item = newCart.find((e) => e.product._id.toString() === productId);

    newCart.splice(newCart.indexOf(item), 1);
    setShoppingCart(newCart);
    await cartApi.handle({
      userId: user._id,
      productId: productId,
      action: "remove",
    });
  };

  const shoppingCartData = {
    shoppingCart,
    updateQuantity,
    removeItem,
    totalCost,
  };

  return (
    <CartContext.Provider value={shoppingCartData}>
      {props.children}
    </CartContext.Provider>
  );
}
