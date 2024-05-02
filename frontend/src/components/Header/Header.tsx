import { Heading, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { ThemeManager } from '../../types';
import './styles/header.css';

type HeaderProps = {
  location: string;
  theme: ThemeManager;
}

function Header({ location, theme }: HeaderProps) {
  const isPublicRoute = ![
    '/',
    '/settings'
  ].includes(location);

  return (
    <header id="my-books-app-header" className={theme.currentTheme === 'dark' ? 'header-dark-theme' : undefined}>
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
            <li>
              <Text
                onClick={() => theme.updateTheme()}
                className="theme-switcher"
              >
                Theme: {theme.currentTheme === 'light' ? 'Light' : 'Dark'}
              </Text>
            </li>
          </ul>
        </nav>
      }
    </header>
  );
}

export default Header;