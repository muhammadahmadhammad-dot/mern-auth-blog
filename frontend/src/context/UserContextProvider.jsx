import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { toast } from "react-toastify";

const UserContextProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isUserAuthenticated") == 'true');
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [userToken, setUserToken] = useState(localStorage.getItem("token") || null);

  const logout = async () => {
     try {
          const sending = await fetch("http://localhost:3000/api/logout", {
            method: "POST",
            headers:{
              Authorization: `Bearer ${userToken}`,
            }
          });
          if (!sending.ok) {
            toast.error("Logout failed");
            return;
          }
          
          setUserToken('');
          setIsAuthenticated(false)
          setAuthUser({})
          
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("isUserAuthenticated");
          
          toast.success("Logout successfully");
    
        } catch (error) {
          console.log("error : ", error);
        }
  }
  useEffect(() => {
    localStorage.setItem("token", userToken || '');
    localStorage.setItem("user", JSON.stringify(authUser));
    localStorage.setItem("isUserAuthenticated", JSON.stringify(isAuthenticated));
  }, [userToken,authUser,isAuthenticated]);
  return (
    <UserContext.Provider value={{logout,setAuthUser,isAuthenticated,setIsAuthenticated, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
