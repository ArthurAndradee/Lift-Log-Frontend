import { useEffect, useState } from 'react';
import { Set } from '../../utils/interfaces/workout';
import { addSet, logWorkout } from '../../helpers/workoutApiCalls'; 
import './create-exercise.css';

function CreateExercise() {
  const [exercise, setExercise] = useState('');
  const [setReps, setSetReps] = useState(0);
  const [setWeight, setSetWeight] = useState(0);
  const [sets, setSets] = useState<Set[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = localStorage.getItem('userId');
        setUserId(Number(decodedToken));
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  const handleAddSet = () => {
    const result = addSet(sets, setWeight, setReps, setSets); 
    if (!result.valid) {
      alert(result.message); 
    }
  };

  const handleLogWorkout = async () => {
    const result = await logWorkout(userId, exercise, sets); 
    
    if (result.logged) {
      setExercise('');
      setSets([]);
      setSetWeight(0);
      setSetReps(0);
    } else {
      console.error('Failed to log workout');
    }
  };

  return (
    <div>
      <h2>Add New Exercise</h2>
      <input
        type="text"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        placeholder="New Exercise Name"
      />

      <label>Weight (kg)</label>
      <input
        type="number"
        value={setWeight}
        onChange={(e) => setSetWeight(Number(e.target.value))}
        placeholder="Weight"
      />
      <label>Reps</label>
      <input
        type="number"
        value={setReps}
        onChange={(e) => setSetReps(Number(e.target.value))}
        placeholder="Reps"
      />
      <button onClick={handleAddSet}>Add Set</button>
      <button onClick={handleLogWorkout}>Log Workout</button>

      <h3>Current Sets:</h3>
      <ul>
        {sets.map((set) => (
          <li key={set.setNumber}>
            Set {set.setNumber}: {set.weight} kg, {set.reps} reps
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateExercise;