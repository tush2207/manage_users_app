import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import About from "./Pages/About";
import UserInfo from "./Pages/UserInfo";
import AddEdit from "./Pages/AddEdit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return(
  
    <BrowserRouter>
    <div className="App">
      <ToastContainer/>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addUser" element={<AddEdit />} />
        <Route path="/editUser/:id" element={<AddEdit />} />
        <Route path="/userInfo/:id" element={<UserInfo/>} />

        <Route path="/about" element={<About />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
