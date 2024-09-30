export interface UserAuthProps {
    setUserId: (id: number) => void; 
}

export interface LogWorkoutProps {
    userId: number | null;
    fetchPreviousRecords: (exercise: string) => void;
}

export interface PreviousRecordsProps {
    userId: number | null;
}

export interface CreateExerciseProps {
    onAdd: (exercise: string) => void;
  }
  