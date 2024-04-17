import { GridItem } from '@chakra-ui/react';
import UserArea from './UserArea';
import BooksNotesArea from './BooksNotesArea';
import { BookNoteProps, User } from '../../../types';

type HomeSidebarProps = {
  user: User;
  books: BookNoteProps;
}

function HomeSidebar({ user, books }: HomeSidebarProps) {
  return (
    <GridItem
      area="nav"
      p="6px"
      shadow="md"
      borderWidth="1px"
      overflowY="auto"
      height="90vh"
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

export default HomeSidebar;