import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import Adduser from "./Adduser";

function Home({ping, setping}) {
  const users = useSelector((state) => state.user.userlist);
  const products=useSelector((state) => state.product.productlist);

  return (
    <div>
        <div style={{display:"flex", justifyContent:"center", marginTop:"20px"}}>
        <Adduser ping={ping} setping={setping}/>
        </div>
      <div className="parent">
        {users?.map((el) => (
          <UserCard el={el} ping={ping} setping={setping}  />
        ))}
      </div>
           <div className="parent">
        {products?.map((el) => (
         <div><h3>{el?.nameproduct}</h3><p>Price : {el?.price}</p></div>
        ))}
      </div>
    </div>
  );
}

export default Home;
