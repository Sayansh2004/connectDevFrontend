import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import UserCard from "./UserCard";

export default function Connections() {

  const connections = useSelector((store) => store.connections);

  const dispatch = useDispatch();

  const fetchConnections = async () => {
    if(connections.length>0){
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

const cleanedConnections = data.trueConnections.map(conn => 
  conn.fromUserId
);

dispatch(addConnections(cleanedConnections));;

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
  <div className="flex flex-col items-center gap-6 my-10">
  {connections.map((connection) => (
    <UserCard key={connection._id} user={connection} />
  ))}
</div>
  );
}