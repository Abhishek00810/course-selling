import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function Login()
{
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    useEffect(()=>{
        document.body.style.backgroundImage =  "url('https://cdn.cbeditz.com/cbeditz/preview/anime-bed-house-room-hd-background-wallpaper-11636386597cyjnwdwmaw.jpg')"
        document.body.style.backgroundRepeat =  'no-repeat'
        document.body.style.backgroundSize =  'cover'
        document.body.style.backgroundPosition =  'center'


        return () => {
            document.body.style.backgroundImage = null;
            document.body.style.backgroundRepeat = null;
            document.body.style.backgroundSize = null; // Reset to original state
          };
    },[])
    function handlechange(e)
    {
        const {name, value} = e.target;

        if(name === 'email')
        {
            setemail(value);
        }
        else{
            setpassword(value);
        }
    }

    const navigate = useNavigate();
    function CALLSIGNIN(e) 
    {
        e.preventDefault(); 
        console.log("signin")
        const fetchdata = async () => {
            axios.post('http://localhost:3000/api/v1/user/signin', {
                email,
                password
            }).then(response => {
                console.log(response.data.userId);
                navigate('/Home',{
                    state: {
                        message: response.data.userId,
                        username: response.data.username
                      }
                })
            }).catch(error => {
                console.log(error)
                //setIncorrect(true);
            });
        };
        fetchdata(); // Call fetchdata to trigger the POST request
    }


    return (

        <div className="logincenter" >
            <h1>Login</h1>
            <div className="loginchild trends">
                            <label>Email:</label>
                            <input
                            name = "email" 
                            type="email"
                            onChange={handlechange}
                            value={email}
                            placeholder="Enter your email" 
                              />
                        </div>

                        <div className="loginchild trends">
                        <label>Password:</label>
                        <input name = "password" 
                        type="password" 
                        onChange={handlechange}
                        value = {password}
                        placeholder="Enter your password"
                         />
                    </div>
                <div className="loginchild trends">
                    <button onClick={CALLSIGNIN}>Sign in</button>
                </div>
        </div>
    );
}

export default Login;