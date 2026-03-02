import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

export default function Connections() {

  const connections = useSelector((store) => store.connections);
  console.log(connections);
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
    <div className="flex flex-col items-center my-10 gap-4">
      <h1 className="font-bold text-xl">Connections</h1>

      {connections.map((connection) => (
        <div
          key={connection._id}
          className="card w-96 bg-base-100 shadow-md p-4"
        >
          <h2 className="font-semibold text-lg">
            {connection.firstName} {connection.lastName}
          </h2>
          <p className="text-sm opacity-70">
            {connection.emailId}
          </p>
        </div>
      ))}
    </div>
  );
}