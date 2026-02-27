import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

export default function Body() {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const fetchUser=async()=>{
    try{
      const response=await fetch("http://localhost:3000/profile/view",{credentials:"include"});
      const json=await response.json();
   
      dispatch(addUser(json));
    }catch(err){
      navigate("/login");
      console.error(err.message);
    }
   
  }

  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex justify-center items-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}