import { User } from 'firebase/auth';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { GetWorkoutsResponse, Workout, workoutService } from '../services/workoutService';

interface WorkoutsContextType {
  workouts: Workout[] | null;
  isLoading: boolean;

  getWorkouts: (user: User) => Promise<Workout[]>;
  deleteWorkout: (workout: Workout) => Promise<boolean>;
}

const initialValues: WorkoutsContextType = {
  workouts: null,
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getWorkouts: function (user: User): Promise<Workout[]> {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteWorkout: function (): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
};

export const WorkoutsContext = createContext<WorkoutsContextType>(initialValues);

export interface WorkoutsProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const WorkoutsProvider = (props: WorkoutsProviderProps) => {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getWorkouts = useCallback(async (user: User) => {
    console.log('Getting workouts');

    const tempWorkouts: Workout[] = [];

    try {
      setIsLoading(true);

      const workoutres = await workoutService.getWorkouts(user.uid);

      console.log(workoutres);

      let x = workoutres!.Workouts;

      x = x.map((w) => {
        w.Display = true;
        return w;
      });

      console.log(x);

      setWorkouts(x);
      //setWorkouts(x);
      tempWorkouts.push(...x);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      return tempWorkouts;
    }
  }, []);

  const deleteWorkout = useCallback(async (workout: Workout) => {
    try {
      setIsLoading(true);

      const workoutres = (await workoutService.deleteWorkout(workout.Id)) as GetWorkoutsResponse;

      if (!workoutres) {
        return false;
      }

      console.log(workoutres);

      setWorkouts(workoutres.Workouts);

      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const values = useMemo(
    () => ({
      workouts,
      isLoading,

      getWorkouts,
      deleteWorkout,
    }),
    [workouts, isLoading, getWorkouts, deleteWorkout]
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
