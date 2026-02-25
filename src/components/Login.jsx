import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";


export default function Login() {
  const formik=useFormik({
    initialValues:{
    email:"",
    password:""
    },
    validationSchema:schemaValidation,
   
  },
onSubmit=async(values,{resetform})
);

  const schemaValidation=Yup.object({
    email:Yup.string().required("Email id is required").email("Please enter a valid email"),
    password:Yup.string().min(8,"minimum 8 characters are required")
      .matches(/[A-Z]/, "Must contain one uppercase letter")
      .matches(/[a-z]/,"Must contain one lowercase letter")
      .matches(/[0-9]/,"must contain one digit")
      .matches(/[#$%^&*@]/,"must contain a special character")
      .required("password is required")
  })
 

  const handleInputChange = (e) => {
   
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Login</h2>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={formik.handleChange}
            placeholder="Email"
            className="input input-bordered w-full"
            onBlur={formik.handleBlur}
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={formik.handleChange}
            placeholder="Password"
            className="input input-bordered w-full mt-3"
            onBlur={formik.handleBlur}
          />

          <button type="submit" className="btn btn-primary mt-4 w-full">
            Login
          </button>
        </div>
      </div>
    </form>
  )
}