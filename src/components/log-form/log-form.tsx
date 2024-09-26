import axios from 'axios';
import { useState } from 'react';
import { LogWorkoutProps } from '../../utils/interfaces/component-props';
import { Set } from '../../utils/interfaces/workout';
import './log-form.css'

function LogWorkout(props: LogWorkoutProps) {
  const [exercise, setExercise] = useState('');
  const [setReps, setSetReps] = useState(0);
  const [setWeight, setSetWeight] = useState(0);
  const [sets, setSets] = useState<Set[]>([]);

  const addSet = () => {
    if (setWeight > 0 && setReps > 0) {
      const newSet: Set = {
        setNumber: sets.length + 1,
        weight: setWeight,
        reps: setReps,
      };
      setSets([...sets, newSet]);
      setSetWeight(0);
      setSetReps(0);
    } else {
      alert('Please enter valid weight and reps for the set.');
    }
  };

  const logWorkout = async () => {
    const userId = props.userId
    if (props.userId) {
      try {
        await axios.post('http://localhost:5000/api/workouts/log', { userId , exercise, sets });
        alert('Workout logged');
        props.fetchPreviousRecords(exercise);
        setExercise('');
        setSets([]);
        setSetWeight(0); 
        setSetReps(0);
      } catch (err) {
        console.error('Failed to log workout');
      }
    }
  };

  return (
    <div>
      <h2>Log Workout</h2>
      <input
        type="text"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        placeholder="Exercise"
      />
      <label>Weight</label>
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
      <button onClick={addSet}>Add Set</button>
      <button onClick={logWorkout}>Log Workout</button>

      <h3>Current Sets</h3>
      <ul>
        {sets.map((set) => (
          <li key={set.setNumber}>
            Set {set.setNumber}: {set.weight} lbs, {set.reps} reps
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogWorkout;
