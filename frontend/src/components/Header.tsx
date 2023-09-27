import { Heading } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';


function Header() {
  return (
    <header id="my-books-app-header" className="flex-center-col">
      <NavLink to="/">
        <Heading as="h4" size="md">my-books-app</Heading>
      </NavLink>
    </header>
  );
}

export default Header;