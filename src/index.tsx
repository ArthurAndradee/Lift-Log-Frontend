import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import PreviousRecords from './pages/previous-workouts/previous-workouts';
import UserAuth from './pages/user-auth/user-auth';
import CreateExercise from './pages/create-exercise/create-exercise';
import LogExercise from './pages/log-exercise/log-exercise';
import Welcome from './pages/welcome/welcome';
import WorkoutContainer from './pages/workout-container/workout-container';
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
      path:'/welcome',
      element: <Welcome />
    },
    {
      path:'/workout-container',
      element: <WorkoutContainer />
    },
    {
      path: '/log-new',
      element: <CreateExercise userId={userId} fetchPreviousRecords={() => {}} />
    },
    {
      path: '/log-existing',
      element: <LogExercise userId={userId} fetchPreviousRecords={() => {}}/>
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
