import { useState, useEffect } from 'react';
import { PreviousRecordsProps } from '../../utils/interfaces/component-props';
import { WorkoutRecord } from '../../utils/interfaces/workout';
import { fetchExercises, fetchPreviousRecords, deleteWorkout } from '../../helpers/workoutApiCalls';
import './previous-workouts.css';

function PreviousRecords(props: PreviousRecordsProps) {
  const [availableExercises, setAvailableExercises] = useState<string[]>([]);
  const [activeRecordExercise, setActiveRecordExercise] = useState<string>('');
  const [previousRecord, setPreviousRecord] = useState<WorkoutRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredExercises, setFilteredExercises] = useState<string[]>([]);

  useEffect(() => {
    if (props.userId) {
      fetchExercises(setAvailableExercises);
    }
  }, [props.userId]);

  useEffect(() => {
    const filtered = availableExercises.filter(exercise =>
      exercise.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExercises(filtered);
  }, [searchQuery, availableExercises]);

  const handleExerciseSelection = async (exercise: string) => {
    await fetchPreviousRecords(props.userId, exercise, setPreviousRecord);
    setActiveRecordExercise(exercise);
  };

  const handleDeleteWorkout = async (workoutId: number) => {
    const isDeleted = await deleteWorkout(props.userId, workoutId);
    if (isDeleted) {
      alert('Workout deleted successfully');
      fetchPreviousRecords(props.userId, activeRecordExercise, setPreviousRecord);
    } else {
      alert('Failed to delete workout');
    }
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
            <li key={record.workoutId}>
              <strong>{record.exercise}</strong> - Série {record.setNumber}, 
              Peso: {record.weight} kgs, 
              {record.reps !== null ? ` Repetições: ${record.reps}` : ' Repetições: N/A'}
              <br />
              Registrado: {new Date(record.date).toLocaleString()}
              <button onClick={() => handleDeleteWorkout(record.workoutId)}>Deletar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Registros não encontrados para esse exercício.</p>
      )}
    </div>
  );
}

export default PreviousRecords;