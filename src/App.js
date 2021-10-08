import './App.css';
import UserPolicy from './components/UserPolicy';
import LoginForm from './components/LoginForm';

import { useState, useEffect } from 'react'


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [username, setUsername] = useState('');


  const getUserSession = (token, username) => {
    setAccessToken(token);
    setUsername(username);
  }

  const logoutClicked = () => {
    setAccessToken('')
  }

  useEffect(() => {
    if(accessToken){
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  })

  return (
    <div className="App">
      {loggedIn ? 
      <header className="App-header">
        <h1 className="text-center">Policy Checker</h1>
        <h3>{username}</h3>
      </header> : 
      <header className="App-header">
        <h1 className="text-center">Policy Checker</h1>
      </header>}

      {!loggedIn ? <LoginForm sendUserSession={getUserSession}/>:<UserPolicy accessToken={accessToken} logoutClicked={logoutClicked}/>}
    </div>
  );
}

export default App;
