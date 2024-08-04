import React, { useState, useEffect } from 'react';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import './LoginPage.css';

function LoginPage() {
    //insert code here to create useState hook variables for email, password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState('');
    const bearerToken = sessionStorage.getItem('bearer-token');
    const { setIsLoggedIn } = useAppContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/app');
        }
    }, [navigate]);

    // insert code here to create handleLogin function and include console.log
    const handleLogin = async (e) => {
        console.log("Login invoked");
        e.preventDefault();

        const res = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': bearerToken ? `Bearer ${bearerToken}` : '', // Include Bearer token if available
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });
        //Step 2: Task 1
        const json = await res.json();

        if (json.authtoken) {

          sessionStorage.setItem('auth-token', json.authtoken);
          sessionStorage.setItem('name', json.userName);
          sessionStorage.setItem('email', json.userEmail);

          setIsLoggedIn(true);
          navigate('/app');

        } else {

            // document.getElementById("email").value =" ";
            // document.getElementById("password").value = "";
            setEmail("");
            setPassword("");
            setIncorrect("Wrong credentials. Try again.");

            setTimeout(() => {
                setIncorrect("");
            }, 2000);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                        
                        <div className="mb-3">
                            <label htmlFor="email" className="form label"> Email </label><br/>
                            <input id="email" type="email" className="form-control" placeholder="Enter your Email" value={email} onChange={(e) => {setEmail(e.target.value); setIncorrect("")}} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form label"> Password </label><br/>
                            <input id="password" type="password" className="form-control" placeholder="Enter your Password" value={password} onChange={(e) => {setPassword(e.target.value); setIncorrect("");}} />
                            <span style={{color:'red',height:'.5cm',display:'block',fontStyle:'italic',fontSize:'12px'}}>{incorrect}</span>
                        </div>

                        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}> Login </button>
                        <p className="mt-4 text-center">
                            New here? <a href="/app/register" className="text-primary"> Register Here </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginPage;