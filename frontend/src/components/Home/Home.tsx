import { Grid } from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import HomeSidebar from './sidebar/HomeSidebar';
import Workspace from './workspace/Workspace';
import useSidebarState from '../../hooks/useSidebarState';
import useWorkspaceManager from './hooks/useWorkspaceManager';
import { BookNoteProps, User } from '../../types';
import './styles/home.css';

type HomeProps = {
  user: User;
  books: BookNoteProps;
}

function Home({ user, books }: HomeProps) {
  const {
    selectNote,
    selectedNote,
    selectedUpdateNote,
    selectedDeleteNote
  } = useWorkspaceManager({
    notes: books.notes,
    createNoteStatus: books.createStatus,
    newNote: books.newNote,
    updateNoteStatus: books.updateStatus,
    deleteNoteStatus: books.deleteStatus,
  });

  const {
    setIsOpen,
    isSidebarOpen,
    setIsActive,
    isSidebarResponsiveSize,
  } = useSidebarState();

  return (
    <main>
      <Grid
        templateAreas={`"nav main"`}
        gridTemplateRows={"auto"}
        gridTemplateColumns={isSidebarResponsiveSize ? '0 4fr' : '1fr 4fr'}
        h="90vh"
        gap="1"
      >
        <Sidebar
          setIsOpen={setIsOpen}
          setIsActive={setIsActive}
          content={
            <HomeSidebar
              user={user}
              books={{
                ...books,
                selectNote,
                selectedNote,
                selectedUpdateNote,
                selectedDeleteNote,
              }}
            />
          }
        />

        <Workspace
          username={user.name}
          workNote={selectedNote}
          updateNote={books.updateBookNote}
          deleteNote={books.deleteBookNote}
          deleteStatus={books.deleteStatus}
          sidebarOpen={isSidebarOpen}
        />
      </Grid>
    </main>
  );
}

export default Home;