import { useState } from "react";
import Alert from "./Alert";

export default function Edit({ formData, setFormData }) {
  const [skillsText, setSkillsText] = useState(formData.skills?.join(", ") || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const [showAlert,setShowAlert]=useState(false)
  
  const handleSkillsChange = (e) => {
    const rawValue = e.target.value;
    
    setSkillsText(rawValue); 

   
    const skillsArray = rawValue
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    setFormData((prev) => ({
      ...prev,
      skills: skillsArray
    }));
  };


  const handleSave=async()=>{
    try{
       const allowedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailId: formData.emailId,
      photoUrl: formData.photoUrl,
      gender: formData.gender,
      age: formData.age,
      about: formData.about,
      skills: formData.skills
    };

    const response=await fetch("http://localhost:3000/profile/edit",{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(allowedData),
      credentials:"include"
    });

    const data=await response.json();
    if(!response.ok){
      throw new Error(data.message);
    }

    setShowAlert(true);

    setTimeout(()=>{
     setShowAlert(false);
    },2000)

    }catch(err){
      console.error(err.message);
    }
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl p-6">
      {showAlert && (
        <div className="mb-4">
          <Alert />
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>

      <div className="space-y-4">

        {/* First Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Last Name */}
        <div className="form-control">
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Last Name"
          />
        </div>

        {/* Photo URL */}
        <div className="form-control">
          <input
            type="text"
            name="photoUrl"
            value={formData.photoUrl || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Photo URL"
          />
        </div>

        {/* Age */}
        <div className="form-control">
          <input
            type="number"
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Age"
          />
        </div>

        {/* About */}
        <div className="form-control">
          <textarea
            name="about"
            value={formData.about || ""}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="About"
          />
        </div>

        {/* 🔥 Skills Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">
              Skills (comma separated)
            </span>
          </label>
          <textarea
            name="skills"
            value={skillsText} // Use the local string state here
            onChange={handleSkillsChange} // Use the custom handler
            className="textarea textarea-bordered w-full"
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        <button className="btn btn-primary w-full mt-4" onClick={handleSave}>
          Save Changes
        </button>
       
      </div>
    </div>
  );
}