import { GridItem } from '@chakra-ui/react';
import UserArea from './UserArea';
import BooksNotesArea from './BooksNotesArea';
import { BookNoteProps, User } from '../../../types';

type SidebarProps = {
  user: User;
  books: BookNoteProps;
}

function Sidebar({ user, books }: SidebarProps) {
  return (
    <GridItem
      area="nav"
      p="5px"
      shadow="md"
      borderWidth="1px"
      overflowY="auto"
    >
      <UserArea
        {...user}
      />

      <BooksNotesArea
        {...books}
      />
    </GridItem>
  );
}

export default Sidebar;