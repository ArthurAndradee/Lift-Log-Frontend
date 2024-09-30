import axios from 'axios';
import { useState, useEffect } from 'react';
import { PreviousRecordsProps } from '../../utils/interfaces/component-props';
import { WorkoutRecord } from '../../utils/interfaces/workout';
import './previous-workouts.css';

function PreviousRecords(props: PreviousRecordsProps) {
  const [availableExercises, setAvailableExercises] = useState<string[]>([]);
  const [activeRecordExercise, setActiveRecordExercise] = useState<string>('');
  const [previousRecord, setPreviousRecord] = useState<WorkoutRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredExercises, setFilteredExercises] = useState<string[]>([]);

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
    const filtered = availableExercises.filter(exercise =>
      exercise.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExercises(filtered);
  }, [searchQuery, availableExercises]);
  
  const fetchPreviousRecord = (exercise: string) => {
    if (props.userId) {
      axios.get(`http://localhost:5000/api/workouts/records/${props.userId}/${exercise}`)
        .then(response => {
          setPreviousRecord(response.data);
        })
        .catch(err => {
          console.error('Error fetching previous records:', err);
        });
    }
  };

  const deleteWorkout = async (workoutId: number) => {
    try {
      await axios.delete('http://localhost:5000/api/workouts/delete', {
        data: { userId: props.userId, workoutId }
      });
      alert('Workout deleted successfully');
      fetchPreviousRecord(activeRecordExercise)
    } catch (err) {
      console.error('Error deleting workout:', err);
      alert('Failed to delete workout');
    }
  };

  const handleExerciseSelection = (exercise: string) => {
    fetchPreviousRecord(exercise);
    setActiveRecordExercise(exercise)
  };

  return (
    <div>
      <h2>Pesquise por treinos anteriores</h2>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for an exercise"
      />

      <ul>
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise, index) => (
            <li key={index} onClick={() => handleExerciseSelection(exercise)}>
              {exercise}
            </li>
          ))
        ) : (
          <li>No exercises found.</li>
        )}
      </ul>

      <h2>Registros anteriores</h2>
      {previousRecord.length > 0 ? (
        <ul>
          {previousRecord.map((record) => (
            <li>
              <strong>{record.exercise}</strong> - Série {record.setNumber}, 
              Peso: {record.weight} kgs, 
              {record.reps !== null ? ` Repetições: ${record.reps}` : ' Repetições: N/A'}
              <br />
              Registrado: {new Date(record.date).toLocaleString()}
              <button onClick={() => deleteWorkout(record.workoutId)}>Deletar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Registros não encontrados para esse exercício.</p>
      )}
    </div>
  );
};

export default PreviousRecords;