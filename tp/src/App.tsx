import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './layout/Header';

export default function App(): JSX.Element {
  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  )
}
