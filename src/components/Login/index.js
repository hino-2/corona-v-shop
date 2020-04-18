import React, { useContext } from 'react';
import { ProductsContext } from '../ProductsContext';
import './style.scss';

const Login = () => {
    const context = useContext(ProductsContext);

    const logIn = async () => {
        const email = document.querySelector('#email').value;
        const pass  = document.querySelector('#password').value;
        
        const responce = await fetch('/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password": pass})
        });
        const user = await responce.json();
        console.log(user);
        context.setUser(user);
    }

    return (
        <div className="login">
            <div>
                &nbsp;
            </div>
            <div>
                <label htmlFor="email">email</label>
                <input type="email" name="email" id="email" required />
                <br />
                <br />
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" required />
                <br />
                <br />
                <button onClick={() => logIn()}>Login</button>
            </div>
            <div>
                <a href="/register">Register</a>
            </div>
        </div>
    );
}

export default Login;