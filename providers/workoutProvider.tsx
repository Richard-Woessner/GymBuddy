import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Workout, workoutService } from '../services/workoutService';

interface WorkoutsContextType {
  workouts: Workout[] | null;
  isLoading: boolean;

  getWorkouts: () => Promise<string>;
}

const initialValues: WorkoutsContextType = {
  workouts: null,
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getWorkouts: function (): Promise<string> {
    throw new Error('Function not implemented.');
  },
};

export const WorkoutsContext = createContext<WorkoutsContextType>(initialValues);

export interface WorkoutsProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const WorkoutsProvider = (props: WorkoutsProviderProps) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getWorkouts = useCallback(async () => {
    try {
      setIsLoading(true);
      const workoutres = await workoutService.getWorkouts();
      setWorkouts(workoutres.Workouts);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
    return 'example';
  }, []);

  const values = useMemo(
    () => ({
      workouts,
      isLoading,

      setWorkouts,
      getWorkouts,
    }),
    [workouts, isLoading, setWorkouts, getWorkouts]
  );

  return <WorkoutsContext.Provider value={values}>{props.children}</WorkoutsContext.Provider>;
};

export const useWorkouts = () => {
  const context = useContext(WorkoutsContext);

  if (context === undefined) {
    throw new Error('useWorkouts must be used within a WorkoutsProvider component.');
  }

  return context;
};
