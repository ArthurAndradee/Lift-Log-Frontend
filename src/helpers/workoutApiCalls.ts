import axios from 'axios';
import { Set, WorkoutRecord } from '../utils/interfaces/workout';

const token = localStorage.getItem('token'); 

export const fetchExercises = async (setAvailableExercises: (exercises: string[]) => void) => {
  try {
    const response = await axios.get('http://localhost:5000/api/workouts/exercises', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    setAvailableExercises(response.data.exercises);
  } catch (err) {
    console.error('Error fetching exercises:', err);
  }
};

export const addSet = (sets: Set[], setWeight: number, setReps: number, setSets: (newSets: Set[]) => void) => {
  if (setWeight > 0 && setReps > 0) {
    const newSet: Set = {
      setNumber: sets.length + 1,
      weight: setWeight,
      reps: setReps,
    };

    setSets([...sets, newSet]);
    return { valid: true };
  } else {
    return { valid: false, message: 'Please enter valid weight and reps for the set.' };
  }
};

export const logWorkout = async ( userId: number | null, exercise: string, sets: Set[]) => {
  if (userId && exercise) {

    if (!token) {
      alert('User is not authenticated.');
      return { logged: false };
    }

    try {
      await axios.post(
        'http://localhost:5000/api/workouts/log',
        { userId, exercise, sets },{
          headers: {
            Authorization: `Bearer ${token}`, 
        }}
      );

      alert('Workout logged');
      return { logged: true };
    } catch (err) {
      console.error('Failed to log workout', err);
      return { logged: false };
    }
  } else {
    alert('Please select an exercise');
    return { logged: false };
  }
};

export const fetchPreviousRecords = async ( userId: number | null, exercise: string, setPreviousRecord: (records: WorkoutRecord[]) => void) => {
  if (userId) {
    
    if (!token) {
      alert('User is not authenticated.');
      return;
    }

    try {
      setPreviousRecord([]); 
      const response = await axios.get(`http://localhost:5000/api/workouts/records/${userId}/${exercise}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      setPreviousRecord(response.data); 
    } catch (err) {
      console.error('Error fetching previous records:', err);
    }
  }
};

export const deleteWorkout = async (userId: number | null, workoutId: number) => {
  if (!token) {
    alert('User is not authenticated.');
    return false;
  }

  try {
    await axios.delete('http://localhost:5000/api/workouts/delete', {
      data: { userId, workoutId },
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return true; 
  } catch (err) {
    console.error('Error deleting workout:', err);
    return false; 
  }
};