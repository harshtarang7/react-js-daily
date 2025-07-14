import { useEffect, useState } from "react";

const style = {
  width: "80%",
  padding: "5px 0px",
  backgroundColor: " #dededeff",
  border: "1px solid #9c9c9cff",
  borderRadius: 2,
};

type formProps = {
  name: string;
  email: string;
  password: string;
};
export const FormComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [savedForm, setSavedForm] = useState<formProps[]>([]);

  
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    const formData: formProps = { name, email, password };
    const updatedforms = [...savedForm, formData];
    setSavedForm(updatedforms);
    localStorage.setItem('form',JSON.stringify(updatedforms))
    setName("");
    setEmail("");
    setPassword("");
  };

  useEffect(()=>{
    const savedForms = localStorage.getItem('form');
    if(savedForms){
        setSavedForm(JSON.parse(savedForms))
    }
  },[])
  return (
    <div style={{ marginTop: "1rem" }}>
      <h1 style={{ textAlign: "center" }}> This is form component </h1>
      <div
        style={{
          marginTop: "1rem",
          width: "60%",
          height: "60%",
          margin: "auto",
          textAlign: "left",
          padding: "1rem",
          borderRadius: 10,
          backgroundColor: " #2661845f",
        }}
      >
        <h5 style={{ textAlign: "center", marginBottom: "1em" }}>
          form handle
        </h5>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Name</label>
            <input
              type="text"
              style={style}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Email</label>
            <input
              type="email"
              style={style}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Password</label>
            <input
              type="password"
              style={style}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleSave}>Submit</button>
        </form>
      </div>

      <div style={{ width: "100%", display: "flex", gap: 6 }}>
        {savedForm.map((form, index) => (
          <div
          key={index}
            style={{
              marginTop: "2rem",
              width: "20%",
              height: 100,
              backgroundColor: " #373737ff",
              display: "flex",
              flexDirection: "column",
              padding: 2,
              textAlign: "start",
              color: "white",
            }}
          >
            <h4>name: {form.name}</h4>
            <h5>email: {form.email}</h5>
            <h6>password: {form.password}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};
