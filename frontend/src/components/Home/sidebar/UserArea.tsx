import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar, Heading, Spacer, Menu, MenuButton, MenuGroup, MenuItem, MenuList, IconButton, MenuDivider, Text } from '@chakra-ui/react';
import useLogout from '../hooks/useLogout';
import { ThemeManager, User } from '../../../types';

type UserAreaProps = {
  user: User;
  theme: ThemeManager
}

function UserArea({ theme, user }: UserAreaProps) {
  const { handleLogout } = useLogout();

  return (
    <section id="nav-user-area" className="user-area-section">
      <Avatar size="sm" />
      <Heading
        as="h2" size="md" mx="8px"
        className="sidebar-heading" fontWeight="semibold"
      >
        {user.name}
      </Heading>

      <Spacer />

      <Menu>
        <MenuButton
          as={IconButton}
          icon={<ChevronDownIcon />}
          variant="ghost"
        />

        <MenuList>
          <MenuGroup title="My Account" my="4px" mx="8px" className="sidebar-heading">
            <MenuItem as={Link} fontSize="14px" to="/settings" target="_blank">
              Settings
            </MenuItem>
          </MenuGroup>
          <MenuGroup title="Preferences" my="4px" mx="8px" className="sidebar-heading">
            <MenuItem as={Text} fontSize="14px" onClick={theme.updateTheme}>
              Theme: {theme.currentTheme}
            </MenuItem>
          </MenuGroup>

          <MenuDivider />

          <MenuGroup title="Session" my="4px" mx="8px" className="sidebar-heading">
            <MenuItem fontSize="14px" onClick={handleLogout}>
              Log out
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </section>
  );
}

export default UserArea;