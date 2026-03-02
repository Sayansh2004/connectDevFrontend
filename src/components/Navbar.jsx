import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

export default function Navbar() {
  const user = useSelector((store) => store.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();

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
          dispatch(removeUser());
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
                  src={user?.photoUrl || "https://plus.unsplash.com/premium_vector-1683141132250-12daa3bd85cf?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                 <Link to="/profile" className="justify-between">Profile</Link> 
                
              </li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
          </div>
        )}

      </div>
    </div>
  )
}