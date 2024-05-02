import { GridItem } from '@chakra-ui/react';
import UserArea from './UserArea';
import BooksNotesArea from './BooksNotesArea';
import { BookNoteProps, ThemeManager, User } from '../../../types';

type HomeSidebarProps = {
  theme: ThemeManager;
  user: User;
  books: BookNoteProps;
}

function HomeSidebar({ theme, user, books }: HomeSidebarProps) {
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
        theme={theme}
        user={user}
      />

      <div className="spacer"></div>

      <BooksNotesArea
        {...books}
      />
    </GridItem>
  );
}

export default HomeSidebar;