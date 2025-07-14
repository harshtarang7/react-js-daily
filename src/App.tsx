import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/home";
import { Counter } from "./components/counter";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div style={{width:'100%'}}>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home />}>Home</Route>
        <Route path="/counter" element={<Counter />}>counter</Route>
      </Routes>
    </div>
  );
}

export default App;
