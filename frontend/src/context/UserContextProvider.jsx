import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState({});
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    localStorage.setItem("token", userToken);
  }, [userToken]);
  return (
    <UserContext.Provider value={{setAuthUser,isAuthenticated,setIsAuthenticated, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
