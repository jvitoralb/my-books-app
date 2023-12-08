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
      shadow="md"
      borderWidth="1px"
      p="5px"
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