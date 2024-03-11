import { createContext, useContext, useMemo, useState } from 'react';
import { Workout } from '../services/workoutService';

interface WorkoutsContextType {
  workouts: Workout[] | null;
  isLoading: boolean;
}

const initialValues: WorkoutsContextType = {
  workouts: null,
  isLoading: false,
};

export const WorkoutsContext = createContext<WorkoutsContextType>(initialValues);

export interface WorkoutsProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const WorkoutsProvider = (props: WorkoutsProviderProps) => {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const getWorkouts = useCallback(async (user: User) => {
  //   console.log('Getting workouts');

  //   const tempWorkouts: Workout[] = [];

  //   console.log('Getting workouts 1');

  //   try {
  //     setIsLoading(false);

  //     console.log('Getting workouts 2');

  //     const workoutres = await workoutService.getWorkouts(user.uid);

  //     console.log(workoutres);

  //     console.log(workoutres);

  //     let x = workoutres!.Workouts;

  //     x = x.map((w) => {
  //       w.Display = true;
  //       return w;
  //     });

  //     console.log(x);

  //     setWorkouts(x);
  //     //setWorkouts(x);
  //     tempWorkouts.push(...x);
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     setIsLoading(false);
  //     return tempWorkouts;
  //   }
  // }, []);

  // const deleteWorkout = useCallback(async (workout: Workout) => {
  //   try {
  //     setIsLoading(true);

  //     const workoutres = (await workoutService.deleteWorkout(workout.Id)) as GetWorkoutsResponse;

  //     if (!workoutres) {
  //       return false;
  //     }

  //     console.log(workoutres);

  //     setWorkouts(workoutres.Workouts);

  //     return true;
  //   } catch (e) {
  //     console.error(e);
  //     return false;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  const values = useMemo(
    () => ({
      workouts,
      isLoading,
    }),
    [workouts, isLoading]
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
