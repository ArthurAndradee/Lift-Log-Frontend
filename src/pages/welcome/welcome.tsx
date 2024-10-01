import { Link, useNavigate } from 'react-router-dom';
import './welcome.css'

function Welcome() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    
    navigate('/');
  };

  return (
    <div>
      <Link to={'/workout-container'}>Registrar treino</Link>
      <Link to={'/previous-records'}>Ver treinos anteriores</Link>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Welcome;
