import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Avatar, Heading, Spacer, Menu, MenuButton, MenuGroup, MenuItem, MenuList, IconButton, MenuDivider } from '@chakra-ui/react';
import useLogout from '../../../hooks/useLogout';
import { User } from '../../../types';


function UserArea({ name }: User) {
  const { handleLogout } = useLogout();

  return (
    <Flex id="user-area" my="5px" alignItems="center">
      <Avatar size="sm" />

      <Heading as="h2" size="md" mx="8px">
        {name}
      </Heading>

      <Spacer />

      <Menu>
        <MenuButton
          as={IconButton}
          icon={<ChevronDownIcon />}
          variant="ghost"
        />

        <MenuList>
          <MenuGroup title="My Account" my="4px" mx="8px">
            <MenuItem as={Link} fontSize="14px" to="/settings" target="_blank">
              Settings
            </MenuItem>
          </MenuGroup>

          <MenuDivider />

          <MenuGroup title="Session" my="4px" mx="8px">
            <MenuItem fontSize="14px" onClick={handleLogout}>
              Log out
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default UserArea;