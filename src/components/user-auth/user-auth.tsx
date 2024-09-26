import axios from 'axios';
import { useState } from 'react';
import { UserAuthProps } from '../../utils/interfaces/component-props';
import './user-auth.css'
import { useNavigate } from 'react-router-dom';

function UserAuth(props: UserAuthProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { username, password });
      props.setUserId(res.data.userId);
      navigate('/home')
    } catch (err) {
      console.error('Login failed');
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/register', { username, password });
      alert('Registered successfully');
    } catch (err) {
      console.error('Registration failed');
    }
  };

  return (
    <div>
      <h2>Login / Register</h2>
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
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default UserAuth;