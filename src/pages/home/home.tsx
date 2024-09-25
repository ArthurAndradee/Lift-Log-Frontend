import { useEffect, useState } from 'react';
import { WorkoutRecord, Set } from '../../utils/interfaces/workout';
import axios from 'axios';

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [exercise, setExercise] = useState('');
  const [setReps, setSetReps] = useState(0);
  const [setWeight, setSetWeight] = useState(0);
  const [sets, setSets] = useState<Set[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [availableExercises, setAvailableExercises] = useState<string[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [previousRecords, setPreviousRecords] = useState<WorkoutRecord[]>([]);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/workouts/exercises`)
        .then(response => {
          setAvailableExercises(response.data.exercises);
        })
        .catch(err => {
          console.error('Error fetching exercises:', err);
        });
    }
  }, [userId, previousRecords]);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { username, password });
      setUserId(res.data.userId);
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


  const fetchPreviousRecords = (exercise: string) => {
    axios.get(`http://localhost:5000/api/workouts/records/${userId}/${exercise}`)
      .then(response => {
        setPreviousRecords(response.data);
      })
      .catch(err => {
        console.error('Error fetching previous records:', err);
      });
  };

  const handleExerciseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newExercise = e.target.value;
    setSelectedExercise(newExercise);
    setPreviousRecords([]);
    if (newExercise) {
      fetchPreviousRecords(newExercise);
    }
  };

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
    try {
      await axios.post('http://localhost:5000/api/workouts/log', { userId, exercise, sets });
      alert('Workout logged');


      fetchPreviousRecords(selectedExercise); 

      setExercise('');
      setSets([]);
      setSetWeight(0); 
      setSetReps(0);
    } catch (err) {
      console.error('Failed to log workout');
    }
  };

  return (
    <div>
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

      {userId && (
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
      )}

      {userId && (
        <div>
          <h2>Search Previous Workout Records</h2>
          <select
            value={selectedExercise}
            onChange={handleExerciseChange}
          >
            <option value="">Select an exercise</option>
            {availableExercises.map((exercise, index) => (
              <option key={index} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>

          <div>
            <h2>Previous Records</h2>
            {previousRecords && previousRecords.length > 0 ? (
              <ul>
                {previousRecords.map((record) => (
                  <li key={record.workoutId}>
                    <strong>{record.exercise}</strong> - Set {record.setNumber}, 
                    Weight: {record.weight} lbs, 
                    {record.reps !== null ? ` Reps: ${record.reps}` : ' Reps: N/A'}
                    <br />
                    Logged on: {new Date(record.date).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No records available for this exercise.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;