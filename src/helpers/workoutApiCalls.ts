import axios from 'axios';
import { Set } from '../utils/interfaces/workout'
import { WorkoutRecord } from '../utils/interfaces/workout';

export const fetchExercises = async (setAvailableExercises: (exercises: string[]) => void) => {
  try {
    const response = await axios.get('http://localhost:5000/api/workouts/exercises');
    setAvailableExercises(response.data.exercises);
  } catch (err) {
    console.error('Error fetching exercises:', err);
  }
};

export const addSet = ( sets: Set[], setWeight: number, setReps: number, setSets: (newSets: Set[]) => void) => {
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

export const logWorkout = async (userId: number | null, exercise: string, sets: Set[], fetchPreviousRecords: (exercise: string) => void) => {
  if (userId && exercise) {
    try {
      await axios.post('http://localhost:5000/api/workouts/log', { userId, exercise, sets });

      alert('Workout logged');
      fetchPreviousRecords(exercise);

      return { logged: true };
    } catch (err) {
      console.error('Failed to log workout');
      return { logged: false };
    }

  } else {
    alert('Please select an exercise');
    return { logged: false };
  }
};

export const fetchPreviousRecords = async ( userId: number | null, exercise: string, setPreviousRecord: (records: WorkoutRecord[]) => void) => {
  if (userId) {
    try {
      setPreviousRecord([])
      const response = await axios.get(`http://localhost:5000/api/workouts/records/${userId}/${exercise}`);
      setPreviousRecord(response.data);
    } catch (err) {
      console.error('Error fetching previous records:', err);
    }
  }
};

export const deleteWorkout = async (userId: number | null, workoutId: number) => {
  try {
    await axios.delete('http://localhost:5000/api/workouts/delete', { data: { userId, workoutId },});
    return true;
  } catch (err) {
    console.error('Error deleting workout:', err);
    return false; 
  }
};