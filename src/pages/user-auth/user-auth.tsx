import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user-auth.css';

function UserAuth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { username, password });

      localStorage.setItem('token', res.data.token);
      console.log(res.data.token)

      navigate('/welcome');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/register', { username, password });
      alert('Registered successfully');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div>
      <h2>Acessar / Criar conta</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Acessar</button>
      <button onClick={handleRegister}>Criar conta</button>
    </div>
  );
}

export default UserAuth;