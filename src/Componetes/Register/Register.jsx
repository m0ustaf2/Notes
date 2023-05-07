import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import notesImg from "../../images/notes1.png"

import * as Yup from "yup"
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'

export default function Register() {
    const notify = (msg,type) => {
        toast[type](msg);
      }

    const navigate = useNavigate()
    const [isLoading , setIsLoading] = useState(false)
  
  
    async function handelRegister(regObject)
    {
      setIsLoading(true)
      let {data} = await axios.post("https://route-movies-api.vercel.app/signup",regObject)
      if(data.message === "success")
      {
        setIsLoading(false)
        notify("success","success")
        navigate('/login')
      }
      else
      {
      notify(data.errors.email.message,'error')
        setIsLoading(false)
      }
  
    }
  
  
    const validation = Yup.object({
      first_name:Yup.string().required("first name is required").min(3 , "min length is 3 ").max(20 , "max length is 20"),
      last_name:Yup.string().required("last name is required").min(3 , "min length is 3 ").max(20 , "max length is 20"),
      email:Yup.string().required("email is required").email("email is invalid"),
      password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{6,10}$/ , 'password must start with uppercase and at least 6 characters & special character not allowed....'),
      age:Yup.number().required("first name is required").min(10 , "min age is 10 ").max(100 , "max age is 100"),
    })
  
    let formik = useFormik({
      initialValues:{
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        age:""
      },
      validationSchema:validation,
      onSubmit: handelRegister
  
    })
  return (
    
      <>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Sign Up</title>
            </Helmet>
    <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        <i className="fa-regular fa-note-sticky text-info fs-2"></i>                           
        <p className='ps-2 text-white fs-4 fw-bold'>Notes</p>
    </li>
    <div className="container">
      <div className="row">
        <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
          <img className='w-100 p-5' src={notesImg}  alt="" />
        </div>
       
       
        <div className="col-lg-7">
        <div className='min-vh-100 d-flex justify-content-center align-items-center text-center signup-container'>
        <div className='bg-light  shadow w-100 mx-auto  p-5 rounded-2'>
            <h1 className='fw-bold'>Sign Up Now</h1>
            <div className='pt-3'>
            <form onSubmit={formik.handleSubmit}>
              <input value={formik.values.first_name}  onChange={formik.handleChange} onBlur={formik.handleBlur}  className='form-control my-2' type="text" name='first_name' id='first_name' placeholder='First Name' />
              {formik.errors.first_name && formik.touched.first_name ?<div className='alert alert-danger'>{formik.errors.first_name}</div>:""}

              <input value={formik.values.last_name} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="text" name='last_name' id='last_name' placeholder='Last Name' />
              {formik.errors.last_name && formik.touched.last_name ?<div className='alert alert-danger'>{formik.errors.last_name}</div>:""}
              
              <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="email" name='email' id='email' placeholder='Email' />
              {formik.errors.email && formik.touched.email ?<div className='alert alert-danger'>{formik.errors.email}</div>:""}

              <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="password" name='password' id='password' placeholder='Password' />
              {formik.errors.password && formik.touched.password ?<div className='alert alert-danger'>{formik.errors.password}</div>:""}

              <input value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="number" name='age' id='age' placeholder='Age' />
              {formik.errors.age && formik.touched.age ?<div className='alert alert-danger'>{formik.errors.age}</div>:""}


            <button disabled={!(formik.isValid && formik.dirty && !isLoading)} type='submit' className='btn btn-info text-light w-100 rounded-2 mt-2'>
                {!isLoading?"Register":<i className='fas fa-spinner fa-spin'></i>}
                </button>
              <p className='pt-2'>Already have account <Link className='text-decoration-none' to='/login'>Login Now</Link></p>
            </form>
            </div>
        </div>
    </div>
        </div>
      </div>
    </div>

    </>
    
  )
}
