import { useState } from "react";
import "./../../../App.css"

function SignUpForm({setDisplayState}) {
    const API_URL = import.meta.env.VITE_API_URL;
    const [role, setRole] = useState("")
    const [signUpCredentials, setSignUpCredentials] = useState(
      {
        username: "",
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        role: ['user'],
      }
    )
  

    const handleChange = (event) => {
      const {name, value} = event.target; 

      if(name === "role"){
        setRole(value)
      }
      else{
      // For other fields, directly set the value
      setSignUpCredentials((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
      }));
      }    
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(role === "admin"){
        signUpCredentials.role.push('admin')
      }
      console.log(signUpCredentials)

      //PostReq
      try {
        const res = await fetch(`${API_URL}/auth/signup`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(signUpCredentials)
        })
        if(!res.ok){
          console.error("Failed to create account")
          alert("Failed to create account")
        }
        else{
          console.log("Account created") 
          alert(" Your account was successfully created!")
          setDisplayState("login");
        }
      }
      catch (error){
        console.error('Error:', error)
      }
    };

  return (
    <div className="container push-down-2">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header fw-bold text-uppercase">Sign Up</div>
            <div className="card-body text-start">
              <form onSubmit={handleSubmit}>
              
                <div className="mb-3">
                  <label htmlFor="username" className="form-label fw-bold mb-0">Username</label>
                  <input type="username" className="form-control" name="username" placeholder="Enter username" value={signUpCredentials.username} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstname" className="form-label fw-bold mb-0">First Name</label>
                  <input type="firstname" className="form-control" name="firstname" placeholder="Enter first name" value={signUpCredentials.firstname} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastname" className="form-label fw-bold mb-0">Last Name</label>
                  <input type="lastname" className="form-control" name="lastname" placeholder="Enter last name" value={signUpCredentials.lastname} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label fw-bold mb-0">Phone number</label>
                  <input type="phone" className="form-control" name="phone" placeholder="Enter phone number" value={signUpCredentials.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold mb-0">Email address</label>
                  <input type="email" className="form-control" name="email" placeholder="Enter email" value={signUpCredentials.email} onChange={handleChange} required />
                </div>        
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-bold mb-0">Password</label>
                  <input type="password" className="form-control" name="password" placeholder="Enter password" value={signUpCredentials.password} onChange={handleChange} required />
                </div>
                <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-dark">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm