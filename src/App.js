import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Notestate from "./context/Notes/notestate";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const[alert ,setalert] = useState(null);
 

  //function to show alert
   const showalert = (message,type)=>{
    console.log("show alert called")
      setalert({
          msg : message,
          type:type
        })
        setTimeout(()=>{
           setalert(null);
        },1500);
      }
  return (
    //wrap everything inside the notestate so each every component can access value provided to state
    <>
      <Notestate>
        <Router>
          <Navbar />
          <Alert alert = {alert}/>
          <div className="container min-vw-100 min-vh-100">
            <Routes>
              <Route path="/" element={<Home showalert ={showalert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showalert ={showalert} />} />
               <Route path="/signup" element={<Signup  showalert ={showalert} />} /> 
               
            </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;
