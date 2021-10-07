import './App.css';
import UserPolicy from './components/UserPolicy';
import LoginForm from './components/LoginForm';

import { useState, useEffect } from 'react'


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');


  const getAccessToken = (token) => {
    setAccessToken(token);
    setLoggedIn(true);
    console.log("Acess token in app = ", accessToken);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Policy App!</h1>
      </header>
      {!loggedIn ? <LoginForm sendAccess={getAccessToken}/>:<UserPolicy accessToken={accessToken} />}
    </div>
  );
}

export default App;
