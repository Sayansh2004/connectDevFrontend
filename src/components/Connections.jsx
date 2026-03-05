import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useNavigate } from "react-router-dom";
// import UserCard from "./UserCard";

export default function Connections() {

  const connections = useSelector((store) => store.connections);
  const navigate=useNavigate()
  const dispatch = useDispatch();

//   const fetchConnections = async () => {
//     if(connections.length>0){
//       return;
//     }
//     try {
//       const response = await fetch(
//         "http://localhost:3000/user/connections",
//         { credentials: "include" }
//       );

//       if (!response.ok) {
//         throw new Error("Error finding connections");
//       }

//       const data = await response.json();

// const cleanedConnections = data.trueConnections.map(conn => 
//   conn.fromUserId
// );

// dispatch(addConnections(cleanedConnections));;

//     } catch (err) {
//       console.error(err.message);
//     }
//   };

const fetchConnections = async () => {
  if (connections.length > 0) {
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3000/user/connections",
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error("Error finding connections");
    }

    const data = await response.json();

    dispatch(addConnections(data.trueConnections));

  } catch (err) {
    console.error(err.message);
  }
};
  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <h1 className="font-bold text-xl">
          Connections Not Found
        </h1>
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-base-200 py-10">
    <div className="max-w-4xl mx-auto px-4 space-y-6">
      {connections.map((user) => (
        <div
          key={user?._id}
          className="flex flex-col md:flex-row items-center 
                     bg-base-100 shadow-md rounded-xl 
                     p-6 w-full gap-6 hover:shadow-xl 
                     transition duration-300"
        >
          {/* Profile Image */}
          <img
            src={user?.photoUrl || "https://via.placeholder.com/150"}
            alt={user?.firstName}
            className="w-32 h-32 object-cover rounded-xl"
          />

          {/* User Info */}
          <div className="flex flex-col flex-grow text-center md:text-left">
            <h2 className="text-2xl font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>

            {user?.age && user?.gender && (
              <p className="text-sm opacity-60 mt-1">
                {user?.age}, {user?.gender}
              </p>
            )}

            {user?.about && (
              <p className="mt-3 text-sm opacity-80">
                {user?.about}
              </p>
            )}

            {user?.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                {user?.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-outline badge-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Chat Button */}
          <div className="flex flex-col justify-center">
            <button
              className="btn btn-primary btn-md"
              onClick={() => navigate(`/chat/${user._id}`)}
            >
              Chat
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}