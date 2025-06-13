import { useEffect, useMemo, type JSX } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './layout/Header';
import FrontLogger from './services/FrontLogger';
import errorObservable from './observer/ErrorObservable';

export default function App(): JSX.Element {

  const frontLogger = useMemo(() => new FrontLogger(), []);

  useEffect(() => {
    errorObservable.subscribe(frontLogger.callbackLog);
    return () => {
      errorObservable.unsubscribe(frontLogger.callbackLog)
    }
  },[])

  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  )
}
