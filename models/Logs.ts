export interface Log {
  date: LogDate;
  exercises: LogExercise[];
}

export interface LogExercise {
  totalWeight: number;
  exerciseName: string;
  totalReps: number;
  sets: LogSet[];
}

interface LogSet {
  completed: boolean;
  setNumber: number;
  reps: number;
  weight: number;
}

interface LogDate {
  seconds: number;
  nanoseconds: number;
}

export const getLogDate = (): LogDate => {
  const d = new Date();
  return {
    seconds: d.getTime() / 1000,
    nanoseconds: d.getTime() * 1000000,
  };
};

export const logDateToDate = (logDate: LogDate): Date => {
  return new Date(logDate.seconds * 1000);
};
