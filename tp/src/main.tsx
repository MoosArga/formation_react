import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes.tsx'
import "./styles/styles.scss"
import { ErrorContextProvider } from './context/errorContext.tsx'
import { UserContextProvider } from './context/userContext.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorContextProvider>
        <UserContextProvider>
          <>
            <App />
            <AppRoutes />
          </>
        </UserContextProvider>
      </ErrorContextProvider>
    </BrowserRouter>
  </StrictMode>
);
