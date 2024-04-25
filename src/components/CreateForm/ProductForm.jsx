import React, { useContext, useState } from "react";
import { CategoryContext } from "../../App";
import { useNavigate } from 'react-router-dom';

function ProductForm() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [category, setCategory] = useState({});
  const [productInput, setProductInput] = useState({
    title: "",
    description: "",
    price: "",
    imageURL: "",
    categoryId: 0,
  });
  const { categories } = useContext(CategoryContext);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "category") {
      setCategory(value);
    }

    setProductInput((inputData) => ({
      ...inputData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const result = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productInput),
      });
      if (!result.ok) {
        setProductInput({
          title: "",
          description: "",
          price: "",
          imageURL: "",
          category: "",
        });
      } else {
        const data = await result.json();
        console.log(data);
        setProductInput({
          title: "",
          description: "",
          price: "",
          imageURL: "",
          category: "",
        });
        window.location.reload();
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleNavigate = () =>{
    navigate('/profile');
  }

  return (
    <div className=" push-down-2">
      <h2 className="text-center fw-bold pb-4">
        Create A New Product
      </h2>
      <div
        className=" container col-md-6 col-11 rounded-3 p-4"
        style={{ background: "var(--product-item-background" }}
      >
    
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold mb-0">Product title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter product title"
              name="title"
              value={productInput.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold mb-0">Product price</label>
            <input
              type="number"
              className="form-control"
              placeholder="$XX.XX"
              name="price"
              value={productInput.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold mb-0">Product image</label>
            <input
              type="text"
              className="form-control"
              placeholder="Image URL"
              name="imageURL"
              value={productInput.imageURL}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold mb-0">Product description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter product description..."
              name="description"
              value={productInput.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Product categories</label>
            <select
              className="form-select"
              name="categoryId"
              onChange={handleChange}
              style={{
                padding: "6px 12px",
              }}
            >
              {categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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

export default ProductForm;
