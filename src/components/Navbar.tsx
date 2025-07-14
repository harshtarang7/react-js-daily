import { Link } from "react-router-dom";

export const Navbar = () => {
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
      </div>
    </div>
  );
};
