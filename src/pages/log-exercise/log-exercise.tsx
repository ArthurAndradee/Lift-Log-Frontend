import axios from 'axios';
import { useState, useEffect } from 'react';
import { LogWorkoutProps, Set } from '../../utils/interfaces/workout';
import './log-exercise.css'

function LogExercise(props: LogWorkoutProps) {
    const [exercise, setExercise] = useState('');
    const [setReps, setSetReps] = useState(0);
    const [setWeight, setSetWeight] = useState(0);
    const [sets, setSets] = useState<Set[]>([]);
    const [availableExercises, setAvailableExercises] = useState<string[]>([]);
  
    useEffect(() => {
      const fetchExercises = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/workouts/exercises');
          setAvailableExercises(response.data.exercises);
        } catch (err) {
          console.error('Error fetching exercises:', err);
        }
      };
  
      fetchExercises();
    }, []);
  
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
      const userId = props.userId;
      console.log(exercise)
      console.log(userId)
      if (userId && exercise) {
        try {
          await axios.post('http://localhost:5000/api/workouts/log', { userId, exercise, sets });
          alert('Workout logged');
          props.fetchPreviousRecords(exercise);
          setExercise('');
          setSets([]);
          setSetWeight(0);
          setSetReps(0);
        } catch (err) {
          console.error('Failed to log workout');
        }
      } else {
        alert('Please select an exercise');
      }
    };
  
    return (
      <div>
        <h2>Add to Existing Exercise</h2>
        <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
          <option value="">Select an Exercise</option>
          {availableExercises.map((ex, index) => (
            <option key={index} value={ex}>{ex}</option>
          ))}
        </select>
  
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
        <button onClick={addSet}>Add Set</button>
        <button onClick={logWorkout}>Log Workout</button>
  
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

export default LogExercise;