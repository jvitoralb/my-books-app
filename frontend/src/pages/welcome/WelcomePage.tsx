import reactLogo from '/assets/react.svg';
import viteLogo from '/assets/vite.svg';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Welcome</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </>
  );
}

export default Welcome;