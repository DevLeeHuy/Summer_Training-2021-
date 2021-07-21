import React, { createContext, useContext, useState, useEffect } from "react";
import cartApi from "../../api/cartApi";
import productApi from "../../api/productApi";
import userApi from "../../api/userApi";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const { user } = useContext(UserContext);

  const [shoppingCart, setShoppingCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  //Get cart by userId
  useEffect(() => {
    (async () => {
      if (user._id) {
        const response = await userApi.shoppingCart({
          userId: user._id,
        });
        if (response.success) {
          setShoppingCart(response.cart);
        }
      }
    })();
    return () => {
      setShoppingCart([]);
    };
  }, [user._id, user.cart]);

  //Update total cost when changing quantity
  useEffect(() => {
    if (shoppingCart.length > 0) {
      setTotalCost(
        shoppingCart.reduce((acc, item) => {
          if (item.checked) return (acc += item.product.price * item.quantity);
          return acc;
        }, 0)
      );
    } else setTotalCost(0);
  }, [shoppingCart]);

  const addToCart = async (productId, quantity = 1) => {
    const newCart = [...shoppingCart];
    const item = await productApi.getById(productId);
    const existedItem = newCart.find((e) => e.product._id === item._id);
    if (existedItem) {
      existedItem.quantity += quantity;
    } else {
      newCart.push({ product: item, quantity });
    }
    setShoppingCart(newCart);
    return cartApi.add({
      userId: user._id,
      productId,
      quantity,
    });
  };

  const updateQuantity = (productId, quantity = 1) => {
    const newCart = [...shoppingCart];
    newCart.forEach((ele) => {
      if (ele.product._id === productId) {
        ele.quantity = quantity;
      }
    });
    setShoppingCart(newCart);
    return cartApi.update({
      userId: user._id,
      productId,
      quantity,
    });
  };

  const removeItem = (productId) => {
    const newCart = [...shoppingCart];
    const item = newCart.find((e) => e.product._id.toString() === productId);

    newCart.splice(newCart.indexOf(item), 1);
    setShoppingCart(newCart);
    return cartApi.delete({
      userId: user._id,
      productId,
    });
  };

  const makeDecision = (productId, checked) => {
    const newCart = [...shoppingCart];
    const item = newCart.find((e) => e.product._id.toString() === productId);
    item.checked = checked;
    setShoppingCart(newCart);
  };

  const shoppingCartData = {
    shoppingCart,
    addToCart,
    updateQuantity,
    removeItem,
    makeDecision,
    totalCost,
  };

  return (
    <CartContext.Provider value={shoppingCartData}>
      {props.children}
    </CartContext.Provider>
  );
}
