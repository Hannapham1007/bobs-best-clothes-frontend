import { useState } from "react";
import "./../../../App.css";
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
    const [failedLogin, setFailedLogin] = useState(false) 
    const [loginCredentials, setLoginCredentials] = useState(
       {
        username: "",
        password: ""
       }
    );

    
    const handleChange = (event) => {
      const {name, value} = event.target; 
      setLoginCredentials((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
      }));
    }

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`${API_URL}/auth/signin`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(loginCredentials)
        });
        if (!res.ok) {
          console.error("Failed to login");
          setFailedLogin(true)
          setLoginCredentials({
            username: "",
            password: ""
          })
        } else {

          setFailedLogin(false)
          
          const data = await res.json();

          const jwtToken = data.token
          localStorage.setItem('token', jwtToken);
          fetchUser(data.id)

          setLoginCredentials({
            username: "",
            password: ""
          })

          navigate('/');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchUser = (id) => {
      fetch(`${API_URL}/users/${id}`)
        .then((res) => {
          console.log(res)
          if (!res.ok) {
            throw new Error('Failed to fetch user data');
          }
          return res.json();
        })
        .then((data) => {
          console.log(data.data);
          localStorage.setItem("loggedInUser", JSON.stringify(data.data));
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    };
    

  return (
    <div className="container push-down-2">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header fw-bold text-uppercase">Log in</div>
          <div className="card-body text-start">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-bold mb-0">Username</label>
                <input type="username" className="form-control" name="username" placeholder="Enter username" value={loginCredentials.username} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold mb-0">Password</label>
                <input type="password" className="form-control" name="password" placeholder="Enter password" value={loginCredentials.password} onChange={handleChange} required />
              </div>
              {(failedLogin) && <p style={{color: "red"}}>Wrong password or username</p>}
              <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-dark">Log in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LoginForm