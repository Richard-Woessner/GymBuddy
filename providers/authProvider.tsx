import { User, createUserWithEmailAndPassword } from 'firebase/auth';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { auth } from '../firebaseConfig';

interface AuthContextType {
  isLoading: boolean;
  user: User | null;

  setUser: (user: User | null) => void;
  getAuth: () => Promise<any>;
  createUser: (email: string, password: string) => Promise<User | null>;
}

const initialValues: AuthContextType = {
  isLoading: false,
  user: null,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAuth: function (): Promise<any> {
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
};

export const AuthContext = createContext<AuthContextType>(initialValues);

export interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthProvider = (props: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, realSetUser] = useState<User | null>(null);

  const setUser = (user: User | null) => {
    console.log(user);
    console.log('Setting user');
    realSetUser(user);
  };

  const getAuth = useCallback(async (): Promise<any> => {
    try {
    } catch (e) {
      console.error(e);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createUser = useCallback(async (email: string, password: string): Promise<User | null> => {
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

  const values = useMemo(
    () => ({
      isLoading,
      user,

      getAuth,
      createUser,
      setUser,
    }),
    [isLoading]
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
