import { useState } from 'react';
import axios from 'axios';
import { WorkoutRecord } from '../../utils/interfaces/workout';

export interface Set {
  setNumber: number;
  weight: number;
}

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [exercise, setExercise] = useState('');
  const [setWeight, setSetWeight] = useState(0);
  const [sets, setSets] = useState<Set[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [previousRecords, setPreviousRecords] = useState<WorkoutRecord[]>([]);

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

  const logWorkout = async () => {
    try {
      await axios.post('http://localhost:5000/api/workouts/log', { userId, exercise, sets });
      alert('Workout logged');
      setExercise('');
      setSets([]);
      setSetWeight(0);
    } catch (err) {
      console.error('Failed to log workout');
    }
  };

  const fetchPreviousRecords = async () => {
    console.log(userId + " aaaaa " + exercise)
    try {
      const res = await axios.get(`http://localhost:5000/api/workouts/records/${userId}/${exercise}`);
      console.log(res.data);
    } catch (err) {
      console.error('Failed to fetch records');
    }
  };

  const addSet = () => {
    if (setWeight > 0) { 
      const newSet: Set = {
        setNumber: sets.length + 1,
        weight: setWeight,
      };
      setSets([...sets, newSet]); 
      setSetWeight(0);
    } else {
      alert('Please enter a valid weight for the set.');
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
          <input
            type="number"
            value={setWeight}
            onChange={(e) => setSetWeight(Number(e.target.value))}
            placeholder="Weight"
          />
          <button onClick={addSet}>Add Set</button>
          <button onClick={logWorkout}>Log Workout</button>
          <button onClick={fetchPreviousRecords}>View Previous Records</button>
          
          <h3>Current Sets</h3>
          <ul>
            {sets.map((set) => (
              <li key={set.setNumber}>
                Set {set.setNumber}: {set.weight} lbs
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2>Previous Records</h2>
        <ul>
          {previousRecords.map((record) => (
            <li key={record.id}>
              {record.exercise} - {record.sets.length} sets logged on {new Date(record.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default Home;