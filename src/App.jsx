import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FileUploadForm from "./FileUploadForm"
import Menu from "./Menu";
import Home from "./Home";
import "./App.css";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <>
     <div className="bl">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<FileUploadForm/>} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
