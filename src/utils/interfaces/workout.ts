export interface Set {
  setNumber: number;
  reps:number;
  weight: number;
}

export interface WorkoutRecord {
  date: string;
  exercise: string;
  reps: number;
  setNumber: number;
  weight: number;
  workoutId: number;
  sets: Set[];
}

export interface LogWorkoutProps {
  userId: number | null;
  fetchPreviousRecords: (exercise: string) => void;
}