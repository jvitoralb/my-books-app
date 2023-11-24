import { Heading } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';


function Header() {
  return (
    <header id="my-books-app-header" className="flex-center-col">
      <Heading as="h1" size="md">
        <NavLink to="/">
          my-books-app
        </NavLink>
      </Heading>
    </header>
  );
}

export default Header;