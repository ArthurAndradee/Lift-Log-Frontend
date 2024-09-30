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

  const deleteWorkout = async (workoutId: number) => {
    try {
      await axios.delete('http://localhost:5000/api/workouts/delete', {
        data: { userId: props.userId, workoutId }
      });
      alert('Workout deleted successfully');
      fetchPreviousRecords(selectedExercise); // Refresh records
    } catch (err) {
      console.error('Error deleting workout:', err);
      alert('Failed to delete workout');
    }
  };

  const handleExerciseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExercise(e.target.value);
  };

  return (
    <div>
      <h2>Pesquise por treinos anteriores</h2>
      <select value={selectedExercise} onChange={handleExerciseChange}>
        <option value="">Selecione um exercício</option>
        {availableExercises.map((exercise, index) => (
          <option key={index} value={exercise}>
            {exercise}
          </option>
        ))}
      </select>

      <h2>Registros anteriores</h2>
      {previousRecords.length > 0 ? (
        <ul>
          {previousRecords.map((record) => (
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
