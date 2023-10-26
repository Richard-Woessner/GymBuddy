import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Workout, workoutService } from '../services/workoutService';
import { logsService } from '../services/logsService';

interface LogsContextType {
  logs: any[] | null;
  isLoading: boolean;

  getLogs: () => Promise<void>;
  postLog: (workout: any) => Promise<void>;
}

const initialValues: LogsContextType = {
  logs: null,
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLogs: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  postLog: function (workout: any): Promise<void> {
    throw new Error('Function not implemented.');
  },
};

export const LogsContext = createContext<LogsContextType>(initialValues);

export interface LogsProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const LogsProvider = (props: LogsProviderProps) => {
  const [logs, setLogs] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await logsService.getLogs();

      setLogs(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const postLog = useCallback(async (workout: object) => {
    try {
      setIsLoading(true);
      const res = await logsService.postLog(workout);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const values = useMemo(
    () => ({
      logs,
      isLoading,

      getLogs,
      postLog,
    }),
    [logs, isLoading, getLogs, postLog]
  );

  return <LogsContext.Provider value={values}>{props.children}</LogsContext.Provider>;
};

export const useLogs = () => {
  const context = useContext(LogsContext);

  if (context === undefined) {
    throw new Error('useLogs must be used within a LogsProvider component.');
  }

  return context;
};
