import React, { createContext, useState } from "react";
import userApi from "../../api/userApi";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  function setCurUser(curUser) {
    localStorage.setItem("user", JSON.stringify(curUser));
    setUser(curUser);
  }
  function unSetCurUser() {
    localStorage.removeItem("user");
    setUser({});
  }
  async function addToFavoriteList(productId) {
    const tempUser = { ...user };
    !tempUser.favorite_list.find((e) => e === productId) &&
      tempUser.favorite_list.push(productId); //Push new item if it isn't already existed
    setCurUser(tempUser);
    await userApi.favorite_list({
      action: "add",
      productId,
      userId: user._id,
    });
    console.log("like");
  }
  async function removeFromFavoriteList(productId) {
    const tempUser = { ...user };
    tempUser.favorite_list.splice(tempUser.favorite_list.indexOf(productId), 1);
    setCurUser(tempUser);
    await userApi.favorite_list({
      action: "remove",
      productId,
      userId: user._id,
    });
    console.log("unlike");
  }
  const userContextData = {
    user,
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
