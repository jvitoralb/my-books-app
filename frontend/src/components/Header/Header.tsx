import { Heading } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import './styles/header.css';

type HeaderProps = {
  location: string;
}

function Header({ location }: HeaderProps) {
  const isPublicRoute = ![
    '/',
    '/settings'
  ].includes(location);

  return (
    <header id="my-books-app-header">
      <Heading 
        as="h1" size="md" fontWeight="semibold" 
        textAlign="center" py={isPublicRoute ? "0px" : "9px"}
      >
        <NavLink to="/" >
          mynotesapp
        </NavLink>
      </Heading>
      {
        isPublicRoute &&
        <nav id="navigation-bar">
          <ul>
            <li><NavLink to="/login" className="nav-bar-link">Login</NavLink></li>
            <li><NavLink to="/signup" className="nav-bar-link">Signup</NavLink></li>
          </ul>
        </nav>
      }
    </header>
  );
}

export default Header;