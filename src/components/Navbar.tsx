import { useState } from "react";
import { Link } from "react-router-dom";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

export const Navbar = () => {
  const [toggle,setToggle]= useState(false);
  
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        padding: "10px 5px",
        display: "flex",
        backgroundColor: " #74a7ffff",
        margin: "auto",
      }}
    >
      <div style={{ width: "20%" }}>REACT COMPONENTS</div>
      <div style={{ width: "40%", display: "flex", gap: 20 }}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          Home
        </Link>
        <Link to={"/counter"} style={{ textDecoration: "none" }}>
          Counter
        </Link>
        <Link to={"/form"} style={{ textDecoration: "none" }}>
          Form
        </Link>
        <Link to={"/todo"} style={{ textDecoration: "none" }}>
          Todo
        </Link>
        <button style={{backgroundColor:'white', border:0,padding:'0px 10px', cursor:'pointer'}} onClick={()=>setToggle(!toggle)}>{toggle?<ToggleOnIcon sx={{color:'green'}}/>:<ToggleOffIcon sx={{color:'red'}}/>}</button>
      </div>
    </div>
  );
};
