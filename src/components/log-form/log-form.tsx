import axios from 'axios';
import { useState, useEffect } from 'react';
import { LogWorkoutProps } from '../../utils/interfaces/component-props';
import { Set } from '../../utils/interfaces/workout';
import './log-form.css';

function LogWorkout(props: LogWorkoutProps) {
  const [exercise, setExercise] = useState('');
  const [setReps, setSetReps] = useState(0);
  const [setWeight, setSetWeight] = useState(0);
  const [sets, setSets] = useState<Set[]>([]);
  const [availableExercises, setAvailableExercises] = useState<string[]>([]);
  const [isNewExercise, setIsNewExercise] = useState(false);

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
    if (userId) {
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
    }
  };

  return (
    <div>
      <h2>Registrar treino</h2>
      <select value={exercise} onChange={(e) => {
        setExercise(e.target.value);
        setIsNewExercise(e.target.value === 'new');
      }}>
        <option value="">Selecione um exercício</option>
        {availableExercises.map((ex, index) => (
          <option key={index} value={ex}>{ex}</option>
        ))}
        <option value="new">Adicionar exercício novo</option>
      </select>

      {isNewExercise && (
        <input
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          placeholder="New Exercise"
        />
      )}

      <label>Peso (kg)</label>
      <input
        type="number"
        value={setWeight}
        onChange={(e) => setSetWeight(Number(e.target.value))}
        placeholder="Weight"
      />
      <label>Repetições</label>
      <input
        type="number"
        value={setReps}
        onChange={(e) => setSetReps(Number(e.target.value))}
        placeholder="Reps"
      />
      <button onClick={addSet}>Adicioanr séries</button>
      <button onClick={logWorkout}>Registrar exercício</button>

      <h3>Série atual:</h3>
      <ul>
        {sets.map((set) => (
          <li key={set.setNumber}>
            Série {set.setNumber}: {set.weight} kgs, {set.reps} repetições
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LogWorkout;
