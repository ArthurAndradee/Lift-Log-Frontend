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
  }, [userId]);

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

  const fetchPreviousRecords = () => {
    axios.get(`http://localhost:5000/api/workouts/records/${userId}/${selectedExercise}`)
      .then(response => {
        setPreviousRecords(response.data.records);
      })
      .catch(err => {
        console.error('Error fetching previous records:', err);
      });
  };

  const addSet = () => {
    if (setWeight > 0 && setReps > 0) {
      const newSet: Set = {
        setNumber: sets.length + 1,
        reps: Number(setReps),
        weight: Number(setWeight),
      };
      setSets([...sets, newSet]);
      setSetWeight(0); 
      setSetReps(0);
    } else {
      alert('Please enter valid values for weight and reps.');
    }
  };

  console.log(previousRecords)

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
          <h2>Search Previous Workout Records</h2>
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
          >
            <option value="">Select an exercise</option>
            {availableExercises.map((exercise, index) => (
              <option key={index} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
          <button onClick={fetchPreviousRecords} disabled={!selectedExercise}>
            Search Records
          </button>

          <h3>Previous Records</h3>
          {/* {previousRecords.length > 0 ? (
            <ul>
              {previousRecords.map((record) => (
                <li key={record.id}>
                  {record.exercise} - {record.sets.length} sets logged on {new Date(record.date).toLocaleString()}
                  <ul>
                    {record.sets.map(set => (
                      <li key={set.setNumber}>
                        Set {set.setNumber}: {set.weight} lbs for {set.reps} reps
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No records found for this exercise.</p>
          )} */}
        </div>
      )}

      <div>
        <h2>Previous Records</h2>
        <ul>
          {/* {previousRecords.map((record) => (
            <li key={record.id}>
              {record.exercise} - {record.sets.length} sets logged on {new Date(record.date).toLocaleString()}
              <ul>
                {record.sets.map(set => (
                  <li key={set.setNumber}>
                    Set {set.setNumber}: {set.weight} lbs for {set.reps} reps
                  </li>
                ))}
              </ul>
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};


export default Home;