import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';

import { useDispatch } from 'react-redux';
import { edituser } from '../redux/userSlice';
function Edituser({ping, setping, el}) {
      const [show, setShow] = useState(false);
const dispatch=useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [edited, setedited] = useState({
        name: el?.name,
        img: el?.img,
        age: el?.age,
        email: el?.email,
        isAdmin:el?.isAdmin
       
  })
  return (
   <>
      <Button variant="primary" onClick={handleShow}>
        edit user
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>user name</Form.Label>
        <Form.Control type="text" placeholder={el?.name} onChange={(e)=>setedited({...edited,name:e.target.value})}/>
    
      </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>user image</Form.Label>
        <Form.Control type="text" placeholder={el?.img} onChange={(e)=>setedited({...edited,img:e.target.value})}/>
    
      </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>user age</Form.Label>
        <Form.Control type="text" placeholder={el?.age}  onChange={(e)=>setedited({...edited,age:e.target.value})}/>
    
      </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>user email</Form.Label>
        <Form.Control type="text" placeholder={el?.email} onChange={(e)=>setedited({...edited,email:e.target.value})} />
    
      </Form.Group>
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{dispatch(edituser({id:el?._id, edited}));setping(!ping);alert("user is updated!");handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edituser