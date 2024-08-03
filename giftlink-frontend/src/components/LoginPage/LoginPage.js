import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
    //insert code here to create useState hook variables for email, password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // insert code here to create handleLogin function and include console.log
    const handleLogin = async () => {
        console.log("Login invoked");
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                        
                        <div className="mb-3">
                            <label htmlFor="email" className="form label"> Email </label><br/>
                            <input id="email" type="email" className="form-control" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                            <label htmlFor="password" className="form label"> Password </label><br/>
                            <input id="password" type="password" className="form-control" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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