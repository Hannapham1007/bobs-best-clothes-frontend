import OrderList from "./components/OrderList";
import ProfileInfo from "./components/ProfileInfo";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./../../App.css";
import ProfileNavbar from "./components/ProfileNavbar";

function Profile() {
  const [showState, setShowState] = useState("info"); 
  const loggedInUser = localStorage.getItem("loggedInUser");
  console.log(loggedInUser);

  if(!loggedInUser){
    return (
      <div className="push-down-2 text-center">
        <p>You have been logged out</p>
        <Link to={`/authentication`} style={{textDecoration:"none", color:"var(--text-color)"}} > <strong>Log back in to view you profile</strong></Link>
      </div>
    )
  }

  return (
    <div >
      <div className="text-center push-down-2">

            <ProfileNavbar setShowState={setShowState} showState={showState}></ProfileNavbar>
      </div>
      {(showState === "info") ?
            <ProfileInfo></ProfileInfo>
            :
            <OrderList></OrderList>
      }
    </div>
  );
}

export default Profile; 
