import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import Edit from "./Edit";
import Card from "./Card";
export default function Profile() {
  const user = useSelector((store) => store.user);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6 flex flex-col md:flex-row justify-center items-start gap-8">
      <Edit formData={formData} setFormData={setFormData} />
      <Card {...formData} />
    </div>
  );
}