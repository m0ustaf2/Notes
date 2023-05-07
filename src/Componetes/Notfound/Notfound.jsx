import React from 'react'
import { Link } from 'react-router-dom'

export default function Notfound() {
  return (
    <>
     <div className=" my-5 text-center d-flex justify-content-center  align-items-center ">
    <div className='my-5'>
    <h1 className='text-warning fs-1 fw-bold  '>404</h1>
      <p className='fs-1 text-warning'>Oops! Page not found</p>
      <span className='text-white'>sorry,but the page you are looking for is not found.Please,make sure you have typed the correct URL</span>
      <div className='text-center my-3'>
  
     <Link to={'/home'} >
      <button className='btn btn-outline-info'>Go to Home</button>

     </Link>

      </div>
    </div>
      
    </div>
    </>
  )
}
