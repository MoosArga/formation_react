import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorContextProvider } from './context/errorContext';
import { UserContextProvider } from './context/userContext';
import Header from './layout/Header';

export default function App(): JSX.Element {
  return (
    <>
      <ErrorContextProvider>
        <UserContextProvider>
          <>
            <Header></Header>
            <Outlet />
          </>
        </UserContextProvider>
      </ErrorContextProvider>
    </>
  )
}
