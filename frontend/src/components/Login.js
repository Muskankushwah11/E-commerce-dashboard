import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Check if the user is already logged in
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/"); // Redirect to home if already logged in
        }
    }, [navigate]);

    const handleLogin = async () => {
        console.warn("Logging in with", email, password);
        try {
            let result = await fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json', // Corrected the content type
                },
            });

            if (!result.ok) throw new Error('Invalid credentials');
            result = await result.json();

            console.warn("Login result:", result);

            // If login is successful, store the user and navigate to home
            if (result.name) {
                localStorage.setItem("user", JSON.stringify(result));
                navigate("/"); // Navigate to home page
            } else {
                alert("Please enter the correct details.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please try again.");
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <input 
                type="text" 
                className="inputBox" 
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
            />
            <input 
                type="password" 
                className="inputBox" 
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
            />
            <button onClick={handleLogin} className="appButton" type="button">
                Login
            </button>
        </div>
    );
};

export default Login;
