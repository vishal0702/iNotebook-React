import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setcredentials] = useState({name: "", email: "", password:"", cpassword:""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const {name, email, password} = credentials;
      const response = await fetch(`http://127.0.0.1:5000/api/auth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json= await response.json();
      console.log(json);
      setcredentials({name:"", email:"", password:"", cpassword:""})
      if(json.success){
        //Save the authToken & redirect
        localStorage.setItem('token', json.authToken);
        navigate("/");
        props.showAlert("Account is created successfully", "success")
      }
      else{
        props.showAlert("Invalid Details", "danger")
      }
      // setcredentials({name:"", email:"", password:"", cpassword:""})
    };

    const onChange = (e) => {
      setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

  return (
    <div className='row justify-content-center align-items-center'>
      <div className="col-md-6" style={{alignItems:"center", width:"500px", }}>
        <h2 className='text-center mb-3' ><u>Signup to iNotebook</u></h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control form-control-sm" id="name" name='name' onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control form-control-sm" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" required />
            <div id="email" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control form-control-sm" id="password" name='password' onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control form-control-sm" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
          </div>
          <div className='d-grid gap-2'>
            <button type="submit" className="btn btn-primary btn-sm">Sign Up</button>
          </div>

          <div className='mt-2' style={{textAlign:"end"}}>
            <p>Already have an account?&nbsp;
                <Link to="/login"><span>Log In</span></Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
