import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch ,useSelector} from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";


export default function Body() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [loading, setLoading] = useState(!user);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/profile/view",
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      const json = await response.json();
      dispatch(addUser(json));

    } catch (err) {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

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