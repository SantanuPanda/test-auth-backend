import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await axios.post(
        'https://test-test-reg.onrender.com/user/register',
        {
          email,
          password
        },
        {
          withCredentials: true, // This enables cookies
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      
      console.log(response.data);
      
      // Store token in localStorage as backup
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Token stored in localStorage');
      }
      
      // Check if cookie was set
      const cookies = document.cookie;
      console.log('Cookies:', cookies);
      
      setMessage('Registration successful!');
      setEmail('');
      setPassword('');
      
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default App