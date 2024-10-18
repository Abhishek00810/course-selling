import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Signup()
{
    const navigate = useNavigate();
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');

    function GoogleAuth()
    {
        window.location.href = 'http://localhost:3000/auth/google';
    }
    
    function CALLCREATEAPI(e)
    {
        e.preventDefault()
        axios.post('http://localhost:3000/api/v1/user/signup', {Email, Password, Firstname, Lastname})
            .then(response=>{
                navigate('/login');
            })
            .catch(error=>{
            })
    }
    
    function handleChange(e){
        const {name, value } = e.target;
        if(name === "email")
        {
            setEmail(value)
        }
        else if(name === "password"){
            setPassword(value)
        } 
        else if(name === "firstname"){
            setFirstname(value)
        }
        else
        {
            setLastname(value)
        }
    }
    return (
        <div>
        <div className="component">
            <div className="part1">
                <div className="upperbar">
                    <h1><i class="ri-leaf-fill"></i>100devx App</h1>
                    <h4><i class="ri-arrow-left-line"></i>Go back</h4>
                </div>
                <form className="main" onSubmit={CALLCREATEAPI}>
                    <h1>Create account</h1>
                    <h4>Start your 30-day free trial.Cancel Anytime.</h4>
                    <button  onClick={GoogleAuth}><i class="ri-google-fill"></i>Sign up with Google</button>
                    <button><i class="ri-apple-fill"></i>Sign up with Apple ID</button>
                    <button><i class="ri-twitter-x-fill"></i>Sign up with X</button>
                    <p>Or</p>
                    <div className="loginsession">
                
                    <div className="holders">
                    <h2>First Name*</h2>
                        <input
                        required
                        name = "firstname" 
                        onChange={handleChange} 
                        placeholder="Enter your first name">
                        </input>
                    </div>


                    <div className="holders">
                    <h2>Last Name*</h2>
                        <input
                        required
                        name = "lastname" 
                        onChange={handleChange} 
                        placeholder="Enter your last name">
                        </input>
                    </div>


                    <div className="holders">
                    <h2>Email*</h2>
                        <input
                        required
                        name = "email"
                        value = {Email} 
                        type="email"
                        onChange={handleChange} 
                        placeholder="Enter your Email">
                        </input>
                    </div>


                    <div className="holders">
                        
                        <h2>Password*</h2>
                        <input name = "password"
                        required
                        value  = {Password}
                        placeholder="Create your password"
                        onChange={handleChange} 
                        type="password"></input>
                    </div>
                    <button type =  "submit" id  = "submitcreate" >Create Account</button>
                    <div className="loginsum">
                    <h5>Already have account? </h5>
                    <h3>Log in</h3>
                    </div>
                    
                    </div>
                </form>
                
            </div>
            <div className="part2">
                <img src="https://images.unsplash.com/photo-1487700066891-e2af21f110b1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
        </div>
    </div>
    );

}


export default Signup;