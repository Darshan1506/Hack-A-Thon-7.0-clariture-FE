import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./Home.css"
import { TypeAnimation } from "react-type-animation";
import CardNew from "./CardNew";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const [ipAddress, setIpAdress] = useState([]);

  const fetchPost = async () => {
    console.log(user.uid,"uid")
    const data = await(await getDoc(doc(db, "users", `${user.uid}`))).data();
    setIpAdress(data.ipAddress);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  const handleSubmit = async(event) => {
    event.preventDefault();
    
    window.location.replace(`http://${ipAddress}:5000`);
  };
  
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="home">
        <div className="heading">
          Here are the Services you have access to
        </div>
        <div className="card-click">
          <div className="firstCard" onClick={handleSubmit} style={{cursor:'pointer'}}>
              <CardNew name="Live Surviellence"/>
          </div>
          <div className="secondCard" >
              <CardNew name="AI Surviellence" onClick={handleSubmit} style={{cursor:'pointer'}}/>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Home;
