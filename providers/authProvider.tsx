import { getData, removeData, storeData } from '@helpers/asyncStorage';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { auth } from '../firebaseConfig';

interface AuthContextType {
  isLoading: boolean;
  user: User | null;

  setUser: (user: User | null) => void;
  getAuth: () => Promise<User | null>;
  createUser: (email: string, password: string) => Promise<User | null>;
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
  createUser: function (email: string, password: string): Promise<User | null> {
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

  const createUser = useCallback(async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Signed up
      const u = userCredential.user;

      setUser(u);
      console.log(u);

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

  const login = useCallback(async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Logged in
      const u = userCredential.user;
      setUser(u);
      console.log(u);
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
