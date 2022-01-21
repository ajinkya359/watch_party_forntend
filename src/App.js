import Login from "./pages/Login";
import Register from "./pages/Register";
import { render } from "react-dom";
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import { RoomId } from "./Context/room_id";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={"Page not found"} />
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;
