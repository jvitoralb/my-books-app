import { Heading } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import './styles/header.css';


function Header() {
  return (
    <header id="my-books-app-header">
      <Heading as="h1" size="md" fontWeight="semibold" textAlign="center">
        <NavLink to="/" >
          my-books-app
        </NavLink>
      </Heading>
    </header>
  );
}

export default Header;