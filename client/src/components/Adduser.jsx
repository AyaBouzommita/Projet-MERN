import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';
import { adduser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
function Adduser({ping, setping}) {
      const [show, setShow] = useState(false);
const dispatch=useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newuser, setnewuser] = useState({
        name: "",
        img: "",
        age: null,
        email: "",
        isAdmin:false
       
  })
  return (
   <>
      <Button variant="primary" onClick={handleShow}>
        add user
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>user name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" onChange={(e)=>setnewuser({...newuser,name:e.target.value})}/>
    
      </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>user image</Form.Label>
        <Form.Control type="text" placeholder="Enter image" onChange={(e)=>setnewuser({...newuser,img:e.target.value})}/>
    
      </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>user age</Form.Label>
        <Form.Control type="text" placeholder="Enter age"  onChange={(e)=>setnewuser({...newuser,age:e.target.value})}/>
    
      </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>user email</Form.Label>
        <Form.Control type="text" placeholder="Enter email" onChange={(e)=>setnewuser({...newuser,email:e.target.value})} />
    
      </Form.Group>
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{dispatch(adduser(newuser));setping(!ping);alert("new user is added!");handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Adduser