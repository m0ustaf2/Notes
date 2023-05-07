import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Note from '../Note/Note'
import axios from "axios"
import jwtDecode from "jwt-decode"
import { useFormik } from 'formik'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet'


export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const token = localStorage.getItem("userToken")
  const userID = jwtDecode(token)._id

  const [userNotes,setUserNotes] = useState(null)

  async function deleteNote(NoteID)
  {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

       ( async()=>{
          let {data} = await axios.delete("https://route-movies-api.vercel.app/deleteNote",{
            data:{
              NoteID,
              token

            }
          })
          if(data.message ==="deleted")
          {
            getUserNotes()
          }
        })()

        swalWithBootstrapButtons.fire(                  
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    
  }

  async function getUserNotes()
  {
    let {data} = await axios.get("https://route-movies-api.vercel.app/getUserNotes",{
      headers:{
        token,
        userID
      },
      params:{

      }
      
    })

    setUserNotes(data.Notes)
  }

   async function addNote(note)
  {
      let {data} = await axios.post("https://route-movies-api.vercel.app/addNote",note)
      console.log(data)
      if (data.message == "success") {
        Swal.fire('Added!', '', 'success').then(() => {
            getUserNotes()
        })

    }
      
  }

  let formik = useFormik({
    initialValues:{
      title:"",
      desc:"",
      userID,
      token
    },
    onSubmit: addNote
  })

  useEffect(()=>{
    getUserNotes()
  },[])



  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input onChange={formik.handleChange} className='form-control my-2' type="text" placeholder='title' name='title' id='title' />
            <input onChange={formik.handleChange} className='form-control' type="text" placeholder='description' name='desc' id='desc'/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{formik.handleSubmit();handleClose()}}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>


    <div className='overflow-hidden'>
      <div className="row">
        <div className="col-2">
            <div className='position-fixed col-lg-2'>
                <Sidebar/>
            </div>
        </div>

        <div className="col-10 px-lg-5 px-2 py-5">
            <div className='text-end me-2'>
            <button onClick={handleShow}  className='btn  btn-info text-white '><i className="fas fa-plus-circle"></i> Add Note</button>
            </div>
          <div className="row">
                {userNotes? userNotes.map((note,index)=>(<Note getUserNotes={getUserNotes} deleteNote={deleteNote} key={note._id} noteDetails={note} />)):<p className='text-center fw-bold my-5 text-secondary'>No notes found</p>}
          </div>
          
        </div>
    </div>
    </div>
    </>
  )
}
