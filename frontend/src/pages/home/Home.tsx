import { useLoaderData } from 'react-router-dom';
import { User } from '../../types';
import useAuth from '../../hooks/useAuth';
import Home from '../../components/Home';


function HomePage() {
  const user = useLoaderData() as User;
  const { token } = useAuth({ operation: 'GET' });
  
  return (
    <Home
      user={user}
    />
  );
}

export default HomePage;