import { Flex, Avatar, Heading, Spacer, Menu, MenuButton, MenuGroup, MenuItem, MenuList, IconButton, MenuDivider } from '@chakra-ui/react';
import { User } from '../../../types';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';


function UserArea({ name }: User) {
  return (
    <Flex my="5px" alignItems="center">
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
            <MenuItem fontSize="14px">
              <Link to="/settings" target="_blank">Settings</Link>
            </MenuItem>
          </MenuGroup>

          <MenuDivider />

          <MenuGroup title="Session" my="4px" mx="8px">
            <MenuItem fontSize="14px">
              Log out
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default UserArea;