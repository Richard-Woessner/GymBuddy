import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Workout, workoutService } from '../services/workoutService';

interface WorkoutsContextType {
  workouts: Workout[] | null;
  isLoading: boolean;

  getWorkouts: () => Promise<void>;
}

const initialValues: WorkoutsContextType = {
  workouts: null,
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getWorkouts: function (): Promise<void> {
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

      const x = workoutres.Workouts.map((workout, i) => {
        return {
          ...workout,
          Id: i.toString(),
        };
      });

      setWorkouts(x);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
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
