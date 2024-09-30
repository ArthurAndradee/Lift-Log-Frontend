import { useNavigate } from 'react-router-dom';
import './workout-container.css';

function WorkoutContainer() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Escolha uma opção</h2>
      <button onClick={() => navigate('/log-existing')}>Adicionar à um exercício existente</button>
      <button onClick={() => navigate('/log-new')}>Adicionar à um novo exercício</button>
    </div>
  );
}

export default WorkoutContainer;
