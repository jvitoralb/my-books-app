import { useLoaderData } from 'react-router-dom';
import { User } from '../../types';
import useAuth from '../../hooks/useAuth';
import Home from '../../components/Home';


function HomePage() {
  const { name } = useLoaderData() as User;
  const { token } = useAuth({ operation: 'GET' });

  return (
    <Home
      name={name}
      token={token}
    />
  );
}

export default HomePage;