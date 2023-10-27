import { CompletedWorkout } from '@models/CompletedWorkout';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { logsService } from '../services/logsService';

interface LogsContextType {
  logs: CompletedWorkout[] | null;
  isLoading: boolean;

  getLogs: () => Promise<CompletedWorkout[]>;
  postLog: (workout: any) => Promise<void>;
}

const initialValues: LogsContextType = {
  logs: null,
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getLogs: function (): Promise<CompletedWorkout[]> {
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
  const [logs, setLogs] = useState<CompletedWorkout[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLogs = useCallback(async (): Promise<CompletedWorkout[]> => {
    try {
      setIsLoading(true);
      const res = await logsService.getLogs();

      if (res === undefined) {
        setLogs([]);
        return [];
      }

      setLogs(res.completedWorkouts);
      return res.completedWorkouts;
    } catch (e) {
      console.error(e);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const postLog = useCallback(async (session: Session) => {
    try {
      setIsLoading(true);
      await logsService.postLog(session);
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
