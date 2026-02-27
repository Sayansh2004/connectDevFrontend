import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((store) => store.user);
  const navigate=useNavigate();

  const handleLogout=async()=>{
       try{
        const response=await fetch("http://localhost:3000/logout",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include"
        })

        const data=await response.json();

        if(response.ok){
           navigate("/login");
        }
      

       }catch(err){
        console.error(err.message);
       }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">ConnectDev</a>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />


        {user && (<p>Welcome, {user?.firstName}</p>)}
        {user && (
          <div className="dropdown dropdown-end mx-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={user?.photoUrl}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                 <Link to="/profile" className="justify-between">Profile</Link> 
                  <span className="badge">New</span>
             
              </li>
              <li><a>Settings</a></li>
              <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
          </div>
        )}

      </div>
    </div>
  )
}