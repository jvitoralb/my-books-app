import { useLoaderData } from 'react-router-dom';
import { User } from '../../types';
import useAuth from '../../hooks/useAuth';


function Home() {
  const { name } = useLoaderData() as User;
  const { token } = useAuth({ operation: 'GET' });

  return (
    <>
      <h1>Welcome back, {name}</h1>
      <form onSubmit={(e) => {e.preventDefault();console.log({book_name: 'nome do livro', user_token: token})}}>
        <label>
          Nome do Livro
          <input id="email" name="email" type="email" />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

export default Home;