import { useState } from "react";
import { useInput } from '../hooks/input-hook';

const LoginForm = ({ sendAccess }) => {

    // COMPONENT STATES + CONSTANTS//

    // User inputs with custom input hook 
    const { value:username, bind:bindUsername, reset:resetUsername } = useInput('');
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');

    // Auth token
    const  [loggedIn, setLoggedIn] = useState(false);
    const  [accessToken, setAccessToken] = useState(null);

    

    // COMPONENT METHODS
    
    // API POST Request
    const postLoginDetails = async (username, password) => {
        // Constants
        const url = "https://api.bybits.co.uk/auth/token"
        const options = {
            method: 'POST',
            headers: {
                'environment': "mock",
                'Content-type': "application/json"
            },
            data: {
                "username":username,
                "password":password,
                "type":"USER_PASSWORD_AUTH"
            }
        };

        try {
            const response = await fetch(url, options);
            const json_data = await response.json();
            setAccessToken(json_data.access_token);
        } catch (error) {
            console.log(error.message);
        }
    }

    
    // Form submission
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting login... ");
        postLoginDetails(username, password);
        sendAccess(accessToken);
        // Reset user detail states
        resetUsername();
        resetPassword();
    }

    return (
        <div>
            {loggedIn ? <h1>{accessToken}</h1> : <></>}
            <h2>User Login</h2>
            <form className="userLoginForm" onSubmit={handleLoginSubmit}>
                <label>Username: 
                    <input type="text" placeholder="Username" {...bindUsername}></input>
                </label>
                <label>Password: 
                    <input type="password" placeholder="Password" {...bindPassword}></input>
                </label>
                <input type='submit' value="search"/>
            </form>
        </div>
    )
}

export default LoginForm;
