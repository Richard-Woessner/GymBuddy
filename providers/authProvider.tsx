import { getData, removeData, storeData } from '@helpers/asyncStorage';
import User, { UserData, createNewUser } from '@models/User';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { auth, db } from '../firebaseConfig';

interface AuthContextType {
  isLoading: boolean;
  user: User | null;

  setUser: (user: User | null) => void;
  getAuth: () => Promise<User | null>;
  createUser: (email: string, password: string, name: string | undefined) => Promise<User | null>;
  login: (email: string, password: string) => Promise<User | null>;
  logOff: () => void;
}

const initialValues: AuthContextType = {
  isLoading: false,
  user: null,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAuth: function (): Promise<User | null> {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createUser: function (
    email: string,
    password: string,
    name: string | undefined
  ): Promise<User | null> {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: function (user: User | null): void {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: function (email: string, password: string): Promise<User | null> {
    throw new Error('Function not implemented.');
  },
  logOff: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const AuthContext = createContext<AuthContextType>(initialValues);

export interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = (props: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, realSetUser] = useState<User | null>(null);

  const setUser = (user: User | null) => {
    console.log('\x1b[32m', `setUser: ${user}`);

    if (user) {
      storeData('user', user);
    } else {
      removeData('user');
    }

    realSetUser(user);
  };

  const getAuth = useCallback(async (): Promise<User | null> => {
    console.log('authProvider: getAuth');
    setIsLoading(true);
    console.log('getAuth');

    if (user) {
      return user;
    }

    try {
      const u = await getData<User>('user');
      console.log('User found in storage: ', u);

      if (u) {
        setUser(u);
        return u;
      } else {
        console.log('No user found in storage');
        return null;
      }
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createUser = useCallback(
    async (email: string, password: string, name: string | undefined): Promise<User | null> => {
      console.log('authProvider: createUser');
      setIsLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        if (name) {
          updateProfile(userCredential.user, {
            displayName: name,
          });
        }

        // Signed up
        const u = userCredential.user;

        const newUserData = createNewUser(u);

        if (newUserData.data) {
          newUserData.data.uid = u.uid;
        }

        setUser(newUserData);

        await setDoc(doc(db, 'Users', u.uid), newUserData.data);

        return newUserData;
      } catch (e: any) {
        const errorCode = e.code;
        const errorMessage = e.message;

        console.log(errorCode);
        console.error(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const login = useCallback(async (email: string, password: string): Promise<User | null> => {
    console.log('authProvider: login');
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const u = userCredential.user;

      const userDocRef = doc(db, 'Users', u.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data() as UserData;

        if (userData) {
          const newUser: User = { ...u, data: userData };
          setUser(newUser);
          return newUser;
        }
      }

      setUser(u);
      return u;
    } catch (e: any) {
      const errorCode = e.code;
      const errorMessage = e.message;
      console.log(errorCode);
      console.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logOff = () => {
    setUser(null);
  };

  useMemo(() => {
    if (!user) {
      getAuth();
    }
  }, []);

  const values = useMemo(
    () => ({
      isLoading,
      user,

      getAuth,
      createUser,
      setUser,
      login,
      logOff,
    }),
    [isLoading, user, getAuth, createUser, setUser]
  );

  return <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider component.');
  }

  return context;
};
