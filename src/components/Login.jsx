import { useFormik } from "formik";

import * as Yup from "yup";


export default function Login() {
  const schemaValidation=Yup.object({
    emailId:Yup.string().required("Email id is required").email("Please enter a valid email"),
    password:Yup.string()
    .min(8,"minimum 8 characters are required")
      .matches(/[A-Z]/, "Must contain one uppercase letter")
      .matches(/[a-z]/,"Must contain one lowercase letter")
      .matches(/[0-9]/,"must contain one digit")
      .matches(/[#$%^&*@]/,"must contain a special character")
      .required("password is required")
  })
  const formik=useFormik({
    initialValues:{
    emailId:"",
    password:""
    },
    validationSchema:schemaValidation,
    onSubmit:async(values,{resetForm})=>{
      try{
         const response=await fetch("http://localhost:3000/login",
            {
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              credentials:"include",
            body:JSON.stringify(values)}
          );
         const data=await response.json();
         console.log(data);

         if(response.ok){
          resetForm();
         }

          
      }catch(err){
        console.error("Error :  "+err.message);
      }
         
}
   
  }

);

  
  

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Login</h2>

          <input
            type="email"
            name="emailId"
            value={formik.values.emailId}
            onChange={formik.handleChange}
            placeholder="Email"
            className="input input-bordered w-full"
            onBlur={formik.handleBlur}
          />
          {formik.touched.emailId && formik.errors.emailId &&(
            <p className="text-sm text-red-500">{formik.errors.emailId}</p>
          )}
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
            className="input input-bordered w-full mt-3"
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
  <p className="text-sm text-red-500">{formik.errors.password}</p>
)}

          <button type="submit" className="btn btn-primary mt-4 w-full">
            Login
          </button>
        </div>
      </div>
    </form>
  )
}