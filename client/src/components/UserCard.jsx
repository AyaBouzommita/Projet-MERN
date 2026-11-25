import React from 'react'
import Card from 'react-bootstrap/Card';
import { deleteuser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import Edituser from './Edituser';
function UserCard({el, ping, setping}) {
    const dispatch=useDispatch();
  return (
 <Card style={{ width: '18rem', margin:"10px" }}>
      <Card.Body>
        <Card.Title>{el?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{el?.email}</Card.Subtitle>
        <Card.Text>
          {el.age}
        </Card.Text>
         <Edituser ping={ping} setping={setping} el={el}/>
        <button onClick={()=>{dispatch(deleteuser(el?._id));setping(!ping)}}>x</button>
      </Card.Body>
    </Card>
  )
}

export default UserCard