import { GridItem } from '@chakra-ui/react';
import UserArea from './UserArea';
import BooksNotesArea from './BooksNotesArea';
import { BookNoteProps, User } from '../../../types';
import '../styles/sidebar.css';

type SidebarProps = {
  user: User;
  books: BookNoteProps;
  isOpen: boolean;
}

function Sidebar({ user, books, isOpen }: SidebarProps) {
  return (
    <GridItem
      area="nav"
      p="6px"
      shadow="md"
      borderWidth="1px"
      overflowY="auto"
      className={'sidebar' + (isOpen ? ' sidebar-open' : '')}
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