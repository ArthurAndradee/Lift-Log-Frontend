import { useState } from 'react';
import LogWorkout from '../../components/log-form/log-form';
import PreviousRecords from '../../components/previous-workouts/previous-workouts';
import UserAuth from '../../components/user-auth/user-auth';

function Home() {
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <div>
      <UserAuth setUserId={setUserId} />

      {userId && (
        <>
          <LogWorkout userId={userId} fetchPreviousRecords={() => {}} />
          <PreviousRecords userId={userId} />
        </>
      )}
    </div>
  );
}

export default Home;
