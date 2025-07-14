import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Counter } from "./components/Counter";
import { FormComponent } from "./components/Form";

function App() {
  return (
    <div style={{width:'100%'}}>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home />}>Home</Route>
        <Route path="/counter" element={<Counter />}>counter</Route>
        <Route path="/form" element={<FormComponent />}>Form</Route>
      </Routes>
    </div>
  );
}

export default App;
