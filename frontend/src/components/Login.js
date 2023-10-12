import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  const [credentials, setcredentials] = useState({email: "", password:""});
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(`http://127.0.0.1:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });
      const json= await response.json();
      console.log(json);
      if(json.success){
        //Save the authToken & redirect
        localStorage.setItem('token', json.authToken);
        navigate("/");
        props.showAlert("Logged in successfully", "success")
      }
      else{
        props.showAlert("Invalid Credentials", "danger")
      }
    };

    const onChange = (e) => {
      setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
            </div>
            
            <button type="submit" className="btn btn-primary">LOG IN</button>
        </form>
    </div>
  )
}

export default Login
