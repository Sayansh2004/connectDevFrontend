import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import UserCard from "./UserCard";

export default function Requests() {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest=async(status,_id)=>{
    try{
      const response=await fetch("http://localhost:3000/request/review/"+status+"/"+_id,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      const data=await response.json();
      dispatch(removeRequests(_id));
    }catch(err){
      console.error(err.message);
    }
  }

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/user/requests/recieved",
        { credentials: "include" }
      );

      const data = await response.json();

      // Extract actual user objects
      const cleanedRequests = data.requests.map(
        (req) => req.fromUserId
      );

      dispatch(addRequests(cleanedRequests));

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return <h1>There are no pending requests</h1>;
  }

  
   return (
  <div className="flex flex-col items-center gap-6 my-10">
    {requests.map((request) => {
      const user = request.fromUserId;

      return (
        <div
          key={request._id}
          className="card bg-base-100 w-96 shadow-sm"
        >
          <figure>
            <img
              src={user.photoUrl || "https://via.placeholder.com/400x300"}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-64 object-cover"
            />
          </figure>

          <div className="card-body">
            <h2 className="card-title">
              {user.firstName} {user.lastName}
            </h2>

            {user.age !== undefined && user.gender && (
              <p className="text-sm opacity-70">
                {user.age}, {user.gender}
              </p>
            )}

            {user.about && <p>{user.about}</p>}

            {user.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-outline badge-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* 🔥 Custom Buttons */}
            <div className="card-actions justify-center gap-4 mt-4">
              <button
                onClick={() =>
                  reviewRequest("accepted", request._id)
                }
                className="btn btn-success"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  reviewRequest("rejected", request._id)
                }
                className="btn btn-error"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>

  );
}