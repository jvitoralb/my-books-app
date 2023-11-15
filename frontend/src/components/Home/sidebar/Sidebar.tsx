import { GridItem } from '@chakra-ui/react';
import { User } from '../../../types';
import UserArea from './UserArea';
import BooksNotesArea from './BooksNotesArea';

type SidebarProps = {
  user: User;
}

function Sidebar({ user }: SidebarProps) {
  return (
    <GridItem
      area="nav"
      shadow="md"
      borderWidth="1px"
      p="5px"
    >
      <UserArea
        {...user}
      />

      <BooksNotesArea />
    </GridItem>
  );
}

export default Sidebar;