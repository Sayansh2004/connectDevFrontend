import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

export default function Feed() {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchFeed = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3000/user/feed",
        { credentials: "include" }
      );

      if (!response.ok) {
        throw new Error("failed to fetch feed");
      }

      const data = await response.json();
      dispatch(addFeed(data.users));
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (feedData.length === 0) {
      fetchFeed();
    }
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading feed...</div>;
  }

  return (
  <div className="min-h-screen bg-base-200 py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <h1 className="text-3xl font-bold mb-8 text-center">
        Discover People
      </h1>

      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-8
      ">
        {feedData.map((feedUser) => (
          <UserCard key={feedUser._id} user={feedUser} />
        ))}
      </div>

    </div>
  </div>
);
}