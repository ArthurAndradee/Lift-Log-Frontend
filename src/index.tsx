import React from 'react';
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
  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserAuth />
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
      element: <CreateExercise />
    },
    {
      path: '/log-existing',
      element: <LogExercise />
    },
    {
      path: '/previous-records',
      element: <PreviousRecords />
    },
  ]);

  return <RouterProvider router={router} />;
};

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

reportWebVitals();