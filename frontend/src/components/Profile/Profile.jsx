import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import UserContext from "../../context/UserContext";

const Profile = () => {
  const {isAuthenticated, logout} = useContext(UserContext)
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  

  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/login")
    }
  },[isAuthenticated,navigate])
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token") || null;
      console.log(token);
      const sending = await fetch("http://localhost:3000/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await sending.json();
      if (!sending.ok) {
        toast.error(response.error);
        return;
      }
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-9/12 mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {user?.fname} {user?.lname} Wellcome to our website
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, quod
        adipisci deserunt enim omnis veniam ipsum expedita? Laudantium est ipsum
        cum atque sint magnam ullam cupiditate quae iure! Dolorem, sequi!
      </p>
        
        <button onClick={logout} className="bg-red-500 text-white px-3 py-2">
          Logout
        </button>
    </div>
  );
};

export default Profile;
