import React from "react";
import Note from "./Note";



const Home = (props) => {
  //destructuring 
  const {showalert} = props
 
  return (
    <>
       <Note showalert = {showalert}/>
    </>
   
    
  );
};

export default Home;
