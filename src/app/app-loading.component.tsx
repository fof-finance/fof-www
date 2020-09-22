/**
 * @format
 */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import SplashScreen from 'src/components/splash-screen.component';

type TaskResult = [string, any];
export type Task = (dispatch: any, activate: any) => Promise<TaskResult | null>;

export interface ApplicationLoaderProps {
  tasks?: Task[];
  initialConfig?: Record<string, any>;
  [x:string]: any;
};

export const AppLoading = (props: ApplicationLoaderProps): React.ReactElement => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const { activate } = useWeb3React();
  const loadingResult = props.initialConfig || {};

  const onTasksFinish = (): void => {
    setLoading(false);
  };

  React.useEffect(() => {
    if (loading) {
      startTasks().then(onTasksFinish);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const saveTaskResult = (result: [string, any] | null): void => {
    if (result) {
      loadingResult[result[0]] = result[1];
    }
  };

  const createRunnableTask = async (task: Task): Promise<void> => {
    return task(dispatch, activate).then(saveTaskResult);
  };

  const startTasks = async (): Promise<any> => {
    if (props.tasks) {
      return Promise.all(props.tasks.map(createRunnableTask));
    }
    return Promise.resolve();
  };

  return (
    <>
      {loading && <SplashScreen/>}
      {!loading && props.children(loadingResult)}
    </>
  );
};
