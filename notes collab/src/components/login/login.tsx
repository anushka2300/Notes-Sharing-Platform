import React, { useState,useEffect } from 'react';
import './Login.css';
import "react-toastify/ReactToastify.css";
import {useNavigate} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify';
 
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [signupInfo,setSignupInfo]=useState({
    name:'',
    email:'',
    password:''
  })

  const navigate=useNavigate();
  
  const handleChange=(e)=>{
    const {name,value}=e.target
   
    const copyInfo={...signupInfo};
    copyInfo[name]=value;
    setSignupInfo(copyInfo)
  }

  const handleSignup=async (e)=>{
    e.preventDefault()
    const {name,email,password}=signupInfo;
    if(!name || !email || !password){
      return toast.error("Incomplete credentials");
    }
    try{
      const response=await fetch("http://localhost:8000/auth/signup",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(signupInfo)
      });
      const res=await response.json();
      const {success,message}=res;
      if (response.status === 409) {
        return toast.error(message);  
    }
      if(success){
        toast.success(message);
        setIsLogin(true);
      }
      else {
        toast.error(message || "Something went wrong");
    }
    }
    catch(err){
      toast.error("invalid");
    }
  }  

  const handleLogin= async (e)=>{
      e.preventDefault();
      const {email,password}=signupInfo;
      if(!email || !password){
        return toast.error("Incomplete credentials");
      }
      try{
         const response=await fetch("http://localhost:8000/auth/login",{
          method:"POST",
          headers:{
             'Content-Type': 'application/json'
          },
          body:JSON.stringify({email,password})
         });
         const res=await response.json();
         const {success,message,jwtToken,name}=res;
         if(success){
          toast.success(message);
          sessionStorage.setItem("token", jwtToken);
          sessionStorage.setItem("userName", name);
          navigate('/');
         }
         else {
          toast.error(message);
      }
      }
      catch(err){
        toast.error("Invalid credentials");
      }
  }

  const handleSubmit=(e)=>{
    isLogin?handleLogin(e):handleSignup(e);
  }
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="name" value={signupInfo.name} placeholder="Enter your username" required  onChange={handleChange}/>
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={signupInfo.email}placeholder="Enter your email" required onChange={handleChange}/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={signupInfo.password} placeholder="Enter your password" required onChange={handleChange}/>
          </div>
          <button type="submit" className="auth-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span onClick={toggleForm}>
            {isLogin ? ' Sign Up' : ' Login'}
          </span>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
