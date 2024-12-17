import React, { useState } from 'react'
import logo from '../logo.png';
import './login.css';
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {

    setUsernameError('');
    setPasswordError('');
    if ('' === username) {
      setUsernameError('Please enter your username')
      return
    }
    if ('' === password) {
      setPasswordError('Please enter your password')
      return
    }

    //https://clerk.com/blog/building-a-react-login-page-template
    // You'll update this function later...
    fetch('http://localhost:4000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.success) {
          localStorage.setItem('user', JSON.stringify({ username, token: r.result }))
          props.setLoggedIn(true);
          props.setUsername(username);
          navigate('/tasks');
        } else {
          window.alert('Wrong username or password')
        }
      });
  }

  return (
    <div className={'mainContainer'}>
      <img src={logo} class='centerImage' alt="logo" />
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default Login