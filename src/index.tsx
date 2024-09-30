import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Home from './pages/home/home';
import LogWorkout from './pages/log-form/log-form';
import PreviousRecords from './pages/previous-workouts/previous-workouts';
import UserAuth from './pages/user-auth/user-auth';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const App = () => {
  const [userId, setUserId] = useState<number | null>(null);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserAuth setUserId={setUserId} />
    },
    {
      path:'/home',
      element: <Home />
    },
    {
      path: '/log-workout',
      element: <LogWorkout userId={userId} fetchPreviousRecords={() => {}} />
    },
    {
      path: '/previous-records',
      element: <PreviousRecords userId={userId} />
    },
  ]);

  return <RouterProvider router={router} />;
};

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
