import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { db } from '../firebaseConfig';
interface FireStoreContextType {
  isLoading: boolean;

  createWorkout: (user: User) => Promise<any>;
  getWorkouts: (user: User) => Promise<any>;
}

const initialValues: FireStoreContextType = {
  isLoading: false,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createWorkout: function (user: User): Promise<any> {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getWorkouts: function (user: User): Promise<any> {
    throw new Error('Function not implemented.');
  },
};

export const FireStoreContext = createContext<FireStoreContextType>(initialValues);

export interface FireStoreProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const FireStoreProvider = (props: FireStoreProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getFireStore = useCallback(async (): Promise<any> => {
    try {
    } catch (e) {
      console.error(e);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createWorkout = useCallback(async (user: User): Promise<any> => {
    setIsLoading(true);
    try {
      // const col = collection(db, 'Users');

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
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getWorkouts = useCallback(async (user: User): Promise<any> => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'Workouts', user.uid);
      const docSnap = await getDoc(docRef);
      const workoutData = docSnap.data();
      return workoutData;
    } catch (e: any) {
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const values = useMemo(
    () => ({
      isLoading,

      createWorkout,
      getWorkouts,
    }),
    [isLoading]
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
