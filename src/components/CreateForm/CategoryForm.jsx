import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../App";
import { useNavigate } from 'react-router-dom';


function CategoryForm() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [categoryInput, setCategoryInput] = useState({
    name: "",
    description: "",
  });

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategoryInput((inputData) => ({
      ...inputData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token')
    
    try{
      const result = await fetch(`${API_URL}/categories`,
      {
        method:"POST",
        headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`},
        body:JSON.stringify(categoryInput)
      });
      if(!result.ok){
        console.log("Failed to create category")
        setCategoryInput({
          name: "",
          description: ""
        })
      }else{
        console.log("Category created")
        const data = await result.json();
        setCategoryInput({
          name:"",
          description:""
        });
        window.location.reload();
      }
    }catch(error){
      console.log('Error', error)
    }
  };

  const handleNavigate = () =>{
    navigate('/profile');
  }

  return (
    <div className="push-down-2">
      <h2 className="text-center fw-bold pb-4">
        Create A New Category
      </h2>
    <div className="container col-md-6 col-11 rounded-3 p-4 "style={{ background: "var(--product-item-background" }}>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold mb-0">Category name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter category name"
            name="name"
            value={categoryInput.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold mb-0">Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter category description"
            name="description"
            value={categoryInput.description}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-center">
        <button className="btn btn-outline" onClick={handleNavigate}>Cancel</button>
        <button className="btn btn-dark">Submit</button>
        </div>
      </form>
    </div>
    </div>

  );
}

export default CategoryForm;
