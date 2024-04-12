import React, { useContext, useEffect, useState } from 'react'
import {  useNavigate, useParams } from "react-router-dom";
import { UserContext } from '../../../App';

function EditProfileInfo() {
    const {id} = useParams();
    const {users, setUsers} = useContext(UserContext);
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const [signUpCredentials, setSignUpCredentials] = useState(
        {
          username: "",
          firstname: "",
          lastname: "",
          phone: "",
          email: "",
          password: "",
          role: [''],
        }
      )

    useEffect(() => {
        if(users && id){
            const user = users.find((item) => Number(item.id) === Number(id));
            if(user){
                setSignUpCredentials(user);
            }
        }
    }, [users, id]);

    

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
    
      const updateLocalStorageUser = (userData) => {
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
      }
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const res = await fetch(`http://localhost:4000/users/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(signUpCredentials)
            });
            if(!res.ok){
                console.error("Failed to update account");
                alert("Failed to update account");
            } else {
              fetchUsers();
                console.log("Account updated");
                alert("Your account was successfully updated!");
                updateLocalStorageUser(signUpCredentials);
                navigate('/profile');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchUsers = () =>{
      fetch("http://localhost:4000/users")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setUsers(data.data);
        });
    }
  


    const handleOnCancel = () =>{
        navigate('/profile');
    }
  return (
    <div className="container push-down-2">
      <div className="row justify-content-center">
      <h3 className="text-uppercase text-center fw-bold pb-4">Your account info </h3>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header fw-bold text-uppercase text-center"> Account</div>
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
                <button type="submit" className="btn btn-outline" onClick={handleOnCancel}>Cancel</button>
                <button type="submit" className="btn btn-dark">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfileInfo