import React, { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  // const hasUser =
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  function setCurUser(curUser) {
    localStorage.setItem("user", JSON.stringify(curUser));
    setUser(curUser);
  }
  function unSetCurUser() {
    localStorage.removeItem("user");
    setUser(null);
  }
  const userContextData = {
    user,
    setCurUser,
    unSetCurUser,
  };
  return (
    <UserContext.Provider value={userContextData}>
      {props.children}
    </UserContext.Provider>
  );
}
