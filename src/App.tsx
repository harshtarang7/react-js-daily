import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Counter } from "./components/Counter";
import { FormComponent } from "./components/Form";
import { Todo } from "./components/todo/Todo";
import { TicTacToe } from "./components/TicTacToe";
import { Products } from "./components/shopping/Products";
import MainContext from "./components/shopping/CartContext";
import { Cart } from "./components/shopping/Cart";

function App() {
  return (
    <div style={{ width: "100%" }}>
      <Navbar />
      <MainContext>
        <Routes>
          <Route path="/" element={<Home />}>
            Home
          </Route>
          <Route path="/counter" element={<Counter />}>
            counter
          </Route>
          <Route path="/form" element={<FormComponent />}>
            Form
          </Route>
          <Route path="/todo" element={<Todo />}>
            Todo
          </Route>
          <Route path="/tictactoe" element={<TicTacToe />}>
            TicTacToe
          </Route>
          <Route path="/products" element={<Products />}>
            Products
          </Route>
          <Route path="/cart" element={<Cart />}>
            Cart
          </Route>
        </Routes>
      </MainContext>
    </div>
  );
}

export default App;
