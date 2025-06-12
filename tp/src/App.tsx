import type { JSX } from 'react'
import FormationManager from './FormationManager'
import type { Formation } from './models/formation';
import { ErrorContextProvider } from './context/errorContext';

export default function App(): JSX.Element {

  const formations: Formation[] = [
        {
            "id": "1",
            "nom": "Javascript",
            "chargeH": 8,
            "typeF": "code",
            "note": 10
        },
        {
            "id": "2",
            "nom": "React",
            "chargeH": 25,
            "typeF": "code",
            "note": 9
        },
        {
            "id": "3",
            "nom": "Angular",
            "chargeH": 0,
            "typeF": "code",
            "note": 9
        }
    ];

  return (
    <>
      <ErrorContextProvider>
        <FormationManager formations={formations} title="Titre avec toto"></FormationManager>
      </ErrorContextProvider>
    </>
  )
}
