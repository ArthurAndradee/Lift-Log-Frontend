/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { PreviousRecordsProps } from '../../utils/interfaces/component-props';
import { WorkoutRecord } from '../../utils/interfaces/workout';
import './previous-workouts.css';

function PreviousRecords(props: PreviousRecordsProps) {
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [availableExercises, setAvailableExercises] = useState<string[]>([]);
  const [previousRecords, setPreviousRecords] = useState<WorkoutRecord[]>([]);

  useEffect(() => {
    if (props.userId) {
      axios.get(`http://localhost:5000/api/workouts/exercises`)
        .then(response => {
          setAvailableExercises(response.data.exercises);
        })
        .catch(err => {
          console.error('Error fetching exercises:', err);
        });
    }
  }, [props.userId]);
  
  useEffect(() => {
    setPreviousRecords([]); 
    fetchPreviousRecords(selectedExercise);
  }, [selectedExercise]);
  
  const fetchPreviousRecords = (exercise: string) => {
    if (props.userId) {
      axios.get(`http://localhost:5000/api/workouts/records/${props.userId}/${exercise}`)
        .then(response => {
          setPreviousRecords(response.data);
        })
        .catch(err => {
          console.error('Error fetching previous records:', err);
        });
    }
  };
  
  const handleExerciseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExercise(e.target.value);
  };

  return (
    <div>
      <h2>Search Previous Workout Records</h2>
      <select value={selectedExercise} onChange={handleExerciseChange}>
        <option value="">Select an exercise</option>
        {availableExercises.map((exercise, index) => (
          <option key={index} value={exercise}>
            {exercise}
          </option>
        ))}
      </select>

      <h2>Previous Records</h2>
      {previousRecords.length > 0 ? (
        <ul>
          {previousRecords.map((record) => (
            <li key={record.workoutId}>
              <strong>{record.exercise}</strong> - Série {record.setNumber}, 
              Weight: {record.weight} kgs, 
              {record.reps !== null ? ` Repetições: ${record.reps}` : ' Repetições: N/A'}
              <br />
              Registrado: {new Date(record.date).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No records available for this exercise.</p>
      )}
    </div>
  );
};

export default PreviousRecords;
