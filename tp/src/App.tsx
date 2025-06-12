import type { JSX } from 'react';
import { ErrorContextProvider } from './context/errorContext';
import FormationManager from './FormationManager';

export default function App(): JSX.Element {
  return (
    <>
      <ErrorContextProvider>
        <FormationManager></FormationManager>
      </ErrorContextProvider>
    </>
  )
}
