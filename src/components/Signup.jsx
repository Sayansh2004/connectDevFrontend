import { useFormik } from "formik"
import { Link } from "react-router-dom";
import * as Yup from "yup";

export default function Signup() {

    const schemaValidation=Yup.object({
        firstName:Yup.string().min(2,"minimun 2 characters are required").max(50,"firstname cannot exceed 50 characters").required("firstName is required"),
        lastName:Yup.string().min(2,"minimun 2 characters are required").max(50,"lastname cannot exceed 50 characters").required("firstName is required"),
        email:Yup.string().email("Please enter a valid email address").required("email is required"),
        password:Yup.string().min(8,"Minimum 8 characters are required")
        .matches("/[A-Z]/","Must contain one uppercase letter")
        .matches("/[a-z]","Must contain one lowercase letter")
        .matches("/[0-9]","Must contain one digit")
        .matches("@!#$%^&*(){}","Must contain a special character")
        .required("password is required")
    
    })

    const formik=useFormik({
        initialValues:{
            firstName:"",
            lastName:"",
            email:"",
            password:""
        },
        validationSchema:schemaValidation,
        onSubmit:async(values,{resetForm})=>{
            try{

            }catch(err){
                console.error(err.message);
            }
        }
    })
  return (
   <form action="">
    <div>
        <label htmlFor="fn"></label>
        <input type="text" id="fn" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    </div>
    <div>
        <label htmlFor="ln"></label>
        <input type="text" id="ln" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    </div>
    <div>
        <label htmlFor="e"></label>
        <input type="text" id="e" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    </div>
    <div>
        <label htmlFor="p"></label>
        <input type="password" id="p" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
    </div>

    <button>Sign Up</button>
    <p>Already a user? <Link to="/login">Sign In</Link></p>
   </form>
  )
}
