import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import signupimg from '../assets/OIP.png'

const Signup = (props) => {
   const[credential,setcredentail] = useState({ name:"",email:"",password:"",cpassword:""})
    
    const navigate = useNavigate();

     const handlesubmit= async (e)=>{
         e.preventDefault();
         console.log("form submitted")
        //api call
         const response = await fetch('http://localhost:5000/api/auth/createuser', {
           method: "POST",
           headers: {
          "Content-Type": "application/json",
         },
         body: JSON.stringify({name:credential.name,email:credential.email,password : credential.password}),
         });
         const json = await response.json();
         console.log( json.authtoken)

        if(json.success){
           //save the token and redirect
           localStorage.setItem('token',json.authtoken)
           // use navigate hook redirect ker dega login page se note page pr
           navigate('/') 
           
           props.showalert("successfully signed up","success")
        }
        else{
          props.showalert("invalid credential","danger");
        }
        
    }

    
      const onchange = (e)=>{
        setcredentail({...credential,[e.target.name ]:e.target.value })
        console.log(credential)
      }

  return (
    <div className=" min-vw -100 min-vh-100 position-relative d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundColor:'rgb(193,204,236)',
        //backgroundImage: `url(${signupimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
       <div className=" text-center p-4  border rounded shadow " style={{width:'500px' ,height:'500px'}}>
      <h2  className="mt-2">Sign Up Here</h2>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onchange}
            aria-describedby="emailHelp"
            value={credential.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onchange}
            aria-describedby="emailHelp"
            value={credential.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            minLength={5}
            onChange={onchange}
            name="password"
            value={credential.password}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            {" "}
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onchange}
            name="cpassword"
            value={credential.cpassword}
            required
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </div>
    
  );
};

export default Signup;
