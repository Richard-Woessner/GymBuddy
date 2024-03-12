import { Log } from '@models/Logs';
import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { db } from '../firebaseConfig';
import { Workout } from '../services/workoutService';
interface FireStoreContextType {
  isLoading: boolean;
  workouts: Workout[] | null;
  logs: Log[] | null;

  createWorkout: (user: User) => Promise<any>;
  getWorkouts: (user: User) => Promise<Workout[] | null>;
  deleteWorkout: (workout: Workout, user: User) => Promise<boolean>;
  getLogs: (user: User) => Promise<Log[] | null>;
  postLog: (log: any, user: User) => Promise<boolean>;
}

const initialValues: FireStoreContextType = {
  isLoading: false,
  workouts: null,
  logs: null,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createWorkout: function (user: User): Promise<any> {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getWorkouts: function (user: User): Promise<any> {
    throw new Error('Function not implemented.');
  },
  deleteWorkout: function (workout: Workout, user: User): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLogs: function (user: User): Promise<any> {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  postLog: function (log: any, user: User): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
};

export const FireStoreContext = createContext<FireStoreContextType>(initialValues);

export interface FireStoreProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const FireStoreProvider = (props: FireStoreProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [logs, setLogs] = useState<Log[] | null>(null);

  const resetStates = useCallback(() => {
    setIsLoading(false);
    setWorkouts(null);
    setLogs(null);
  }, []);

  const createWorkout = useCallback(async (user: User): Promise<any> => {
    console.log('fireStoreProvider: createWorkout');
    setIsLoading(true);
    try {
      if (!user) {
        console.log('Create workout: No user');
        return null;
      }

      await setDoc(doc(db, 'Workouts', user.uid), {
        uid: user.uid,
        User: 'User',
        Workouts: initWorkout.Workouts,
      });

      const docRef = await setDoc(doc(db, 'Users', user.uid), {
        uid: user.uid,
      });

      return docRef;
    } catch (e: any) {
      console.error(e);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getWorkouts = useCallback(async (user: User): Promise<Workout[] | null> => {
    console.log('fireStoreProvider: getWorkouts');
    setIsLoading(true);

    try {
      if (!user) {
        console.log('getWorkouts: No user');
      }

      const docRef = doc(db, 'Workouts', user.uid);
      const docSnap = await getDoc(docRef);
      let w = docSnap.data();

      let x = w!.Workouts as Workout[];

      console.log(`Recieved ${x.length} workouts from firestore`);

      x = x.map((w) => {
        w.Display = true;
        return w;
      }) as Workout[];

      setWorkouts(x);

      return x;
    } catch (e: any) {
      console.error(e);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteWorkout = useCallback(async (workout: Workout, user: User): Promise<boolean> => {
    console.log('fireStoreProvider: deleteWorkout');
    setIsLoading(true);

    try {
      const docRef = doc(db, 'Workouts', user.uid);
      const docSnap = await getDoc(docRef);
      const workouts = docSnap.data()?.Workouts;
      if (!workouts) {
        return false;
      }
      const updatedWorkouts = workouts.filter((w: Workout) => w.Id !== workout.Id);

      const responce = await setDoc(doc(db, 'Workouts', user.uid), {
        ...docSnap.data(),
        Workouts: updatedWorkouts,
      });

      setWorkouts(updatedWorkouts);

      return true;
    } catch (e: any) {
      console.log(e);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getLogs = useCallback(async (user: User): Promise<Log[] | null> => {
    console.log('fireStoreProvider: getLogs');
    setIsLoading(true);
    try {
      const docRef = doc(db, 'Logs', user.uid);
      console.log(docRef);

      const docSnap = await getDoc(docRef);
      let x = docSnap.data() as { Logs: Log[] } | null;

      if (!x) {
        return null;
      }

      setLogs(x.Logs);

      return x.Logs;
    } catch (e: any) {
      console.error(e);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const postLog = useCallback(async (log: any, user: User): Promise<boolean> => {
    setIsLoading(true);
    console.log('Posting log to firestore');
    try {
      const docRef = doc(db, 'Logs', user.uid);
      const docSnap = await getDoc(docRef);
      const logs = docSnap.data()?.Logs;
      const updatedLogs = logs ? [...logs, log] : [log];
      const response = await setDoc(doc(db, 'Logs', user.uid), {
        ...docSnap.data(),
        Logs: updatedLogs,
      });
      setLogs(updatedLogs);
      return true;
    } catch (e: any) {
      console.log(e);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const values = useMemo(
    () => ({
      isLoading,
      workouts,
      logs,

      createWorkout,
      getWorkouts,
      deleteWorkout,
      getLogs,
      postLog,
    }),
    [isLoading, workouts, logs]
  );

  return <FireStoreContext.Provider value={values}>{props.children}</FireStoreContext.Provider>;
};

export const useFireStore = () => {
  const context = useContext(FireStoreContext);

  if (context === undefined) {
    throw new Error('useFireStore must be used within a FireStoreProvider component.');
  }

  return context;
};

const initWorkout = {
  Workouts: [
    {
      Exercises: [
        {
          Sets: [
            {
              Weight: 135,
              Reps: 10,
              SetNumber: 1,
            },
            {
              Reps: 10,
              SetNumber: 2,
              Weight: 135,
            },
            {
              Reps: 10,
              Weight: 135,
              SetNumber: 3,
            },
          ],
          Id: 'a8d19f4b-ce6e-4d23-abda-d17f65426763',
          Type: 'Lift',
          Exercise: 'Bench Press',
        },
        {
          Id: '246c3f2a-c867-4af8-a70e-894f46a1da77',
          Type: 'Lift',
          Sets: [
            {
              SetNumber: 1,
              Weight: 135,
              Reps: 5,
            },
            {
              SetNumber: 2,
              Reps: 5,
              Weight: 135,
            },
            {
              Reps: 5,
              Weight: 135,
              SetNumber: 3,
            },
            {
              Reps: 5,
              SetNumber: 4,
              Weight: 135,
            },
            {
              Reps: 5,
              Weight: 135,
              SetNumber: 5,
            },
          ],
          Exercise: 'Deadlift',
        },
      ],
      Id: '70a0862d-83a3-4dfdf-ba51-057a8ad91e38',
      Name: 'Chest Day',
    },
  ],
};
