import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface ExampleContextType {
  someState: string;
  otherState: boolean;
  isLoading: boolean;

  setSomeState: (newVal: string) => void;
  setOtherState: (newVal: boolean) => void;
  makeSomeAPICall: () => Promise<string>;
}

const initialValues: ExampleContextType = {
  someState: 'a',
  otherState: false,
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSomeState: function (newVal: string): void {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOtherState: function (newVal: boolean): void {
    throw new Error('Function not implemented.');
  },
  makeSomeAPICall: function (): Promise<string> {
    throw new Error('Function not implemented.');
  },
};

export const ExampleContext = createContext<ExampleContextType>(initialValues);

export interface ExampleProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const ExampleProvider = (props: ExampleProviderProps) => {
  const [someState, setSomeState] = useState<string>('');
  const [otherState, setOtherState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const makeSomeAPICall = useCallback(async () => {
    try {
      setIsLoading(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
    return 'example';
  }, []);

  const values = useMemo(
    () => ({
      someState,
      otherState,
      isLoading,

      setSomeState,
      setOtherState,
      makeSomeAPICall,
    }),
    [someState, otherState, isLoading, setSomeState, setOtherState, makeSomeAPICall]
  );

  return <ExampleContext.Provider value={values}>{props.children}</ExampleContext.Provider>;
};

export const useExample = () => {
  const context = useContext(ExampleContext);

  if (context === undefined) {
    throw new Error('useExample must be used within a ExampleProvider component.');
  }

  return context;
};
