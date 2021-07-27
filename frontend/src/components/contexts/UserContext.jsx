import React, { createContext, useState, useEffect } from "react";
import userApi from "../../api/userApi";
import orderApi from "../../api/oderApi";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [orders, setOrders] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  //Get customer orders
  useEffect(() => {
    if (user._id)
      (async () => {
        try {
          const response = await orderApi.getOrders({ userId: user._id });
          setOrders(response.orders);
        } catch (err) {
          console.log(err);
        }
      })();
  }, [user._id]);

  //Get customer favorite list
  useEffect(() => {
    if (user._id)
      (async () => {
        try {
          const response = await userApi.favorite_list({ userId: user._id });
          setFavoriteList(response.favorite_list);
        } catch (err) {
          console.log(err);
        }
      })();
  }, [JSON.stringify(user.favorite_list)]);

  function setCurUser(curUser) {
    localStorage.setItem("user", JSON.stringify(curUser));
    setUser(curUser);
  }
  function unSetCurUser() {
    localStorage.removeItem("user");
    setUser({});
  }

  function addToFavoriteList(productId) {
    const tempUser = { ...user };
    !tempUser.favorite_list.find((e) => e === productId) &&
      tempUser.favorite_list.push(productId); //Push new item if it isn't already existed
    userApi
      .favorite_list(
        {
          productId,
          userId: user._id,
        },
        "add"
      )
      .then(() => {
        setCurUser(tempUser);
      });
  }
  function removeFromFavoriteList(productId) {
    const tempUser = { ...user };
    tempUser.favorite_list.splice(tempUser.favorite_list.indexOf(productId), 1);
    userApi
      .favorite_list(
        {
          productId,
          userId: user._id,
        },
        "remove"
      )
      .then(() => {
        setCurUser(tempUser);
      });
  }

  const loginThirdParty = {
    facebook: async ({ accessToken }) => {
      try {
        const response = await userApi.loginByFacebook(accessToken);
        if (response.success) setCurUser(response.user);
      } catch (err) {
        console.log(err.message);
      }
    },
    google: async ({ accessToken }) => {
      try {
        const response = await userApi.loginByGoogle(accessToken);
        if (response.success) setCurUser(response.user);
      } catch (err) {
        console.log(err);
      }
      // console.log(accessToken);
    },
  };

  const userContextData = {
    user,
    loginThirdParty,
    orders,
    favoriteList,
    setCurUser,
    unSetCurUser,
    addToFavoriteList,
    removeFromFavoriteList,
  };
  return (
    <UserContext.Provider value={userContextData}>
      {props.children}
    </UserContext.Provider>
  );
}
