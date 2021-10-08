import { useInput } from '../hooks/input-hook';

const LoginForm = ({ sendUserSession }) => {

    // COMPONENT STATES + CONSTANTS//

    // User inputs with custom input hook 
    const { value:username, bind:bindUsername, reset:resetUsername } = useInput('');
    const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');

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

            console.log("USER DATA = ", json_data);

            sendUserSession(json_data.access_token, json_data.username);
        } catch (error) {
            console.log(error.message);
        }
    }

    
    // Form submission
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting login... ");
        postLoginDetails(username, password);
        // Reset user detail states
        resetUsername();
        resetPassword();
    }
   

    return (
        <div className="component">
            <div className="container">
                <h2 className="text-center">User Login</h2>
                <form className="userLoginForm" onSubmit={handleLoginSubmit}>
                    <label>Username:
                        <input type="text" placeholder="Username" {...bindUsername}></input>
                    </label>
                    <label>Password:
                        <input type="password" placeholder="Password" {...bindPassword}></input>
                    </label>
                    <input type='submit' value="Sign In"/>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;
