import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function Body() {
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