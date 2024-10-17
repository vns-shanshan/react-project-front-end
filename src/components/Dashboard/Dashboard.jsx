import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import PostSearch from './PostSearch';


const Dashboard = () => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <PostSearch />

      <p>
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
    </main>
  );
};

export default Dashboard;
