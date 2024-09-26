import { Link } from 'react-router-dom';
import './home.css'

function Home() {

  return (
    <div>
      <Link to={'/log-workout'}>Log Workout</Link>
      <Link to={'/previous-records'}>Previous Records</Link>
    </div>
  );
}

export default Home;
