import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import {API} from '../api-service'


function Auth() {

    const [username, setusername]=useState('');
    const [password, setpassword]=useState('');
    const[isLoginView, setLoginView]=useState(true)
    const [token, setToken] = useCookies(['mr-token']);
    const isDisabled = username.length ===0 || password.length ===0
    const loginClicked = ()=>{
        API.loginUser({username, password}).then(resp => setToken('mr-token',resp.token))
        .catch(error => console.log(error))
    }

    const registerClicked = ()=>{
        API.registerUser({username, password}).then(() => loginClicked())
        .catch(error => console.log(error))
    }

    useEffect(()=>{
        console.log(token);
        if (token['mr-token']) window.location.href = '/movies';
    }, [token])

    return (
        <React.Fragment>

            <div className="App"><header className="App-header">
            {isLoginView ? <h1>Login</h1>:<h1>Register</h1>}
            </header>
                <div className="login-container">
                <label htmlFor="username">username</label><br></br>
                <input id="username" type="text" placeholder="username" value={username}
                    onChange={evt => setusername(evt.target.value)} />
                <br></br>
                <label htmlFor="password">password</label><br></br>
                <input id="password" type="password" placeholder="password" value={password}
                    onChange={evt => setpassword(evt.target.value)}
                ></input><br></br>
                { isLoginView?
                <button onClick={loginClicked} disabled={isDisabled} >Login</button>:
                <button onClick={registerClicked} disabled={isDisabled} >Register</button>}
                {isLoginView? <p onClick={()=>setLoginView(false)}>You Don't Have an account? Register here!</p>:
                <p onClick={()=>setLoginView(true)}>Registered User? Login here!</p>}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Auth;