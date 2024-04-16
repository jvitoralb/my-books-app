import { Grid } from '@chakra-ui/react';
import Sidebar from './sidebar/Sidebar';
import Workspace from './workspace/Workspace';
import useSidebar from './hooks/useSidebar';
import useWorkspaceManager from './hooks/useWorkspaceManager';
import { BookNoteProps, User } from '../../types';

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
    watchingResize,
    sidebarOpen,
    sidebarHamburguerHandler,
  } = useSidebar();

  return (
    <main>
      <Grid
        templateAreas={`"nav main"`}
        gridTemplateRows={"auto"}
        gridTemplateColumns={watchingResize ? '0 4fr' : '1fr 4fr'}
        h="90vh"
        gap="1"
      >
        <label aria-label="Open sidebar" id="hamburguer-menu" className="hamburguer-menu">
          <input
            id="hamburguer-checkbox" type="checkbox"
            autoComplete="off" onClick={sidebarHamburguerHandler}
          />
        </label>

        <Sidebar
          user={user}
          books={{
            ...books,
            selectNote,
            selectedUpdateNote,
            selectedDeleteNote
          }}
          isOpen={sidebarOpen}
        />

        <Workspace
          username={user.name}
          workNote={selectedNote}
          updateNote={books.updateBookNote}
          deleteNote={books.deleteBookNote}
          deleteStatus={books.deleteStatus}
          sidebarOpen={sidebarOpen}
        />
      </Grid>
    </main>
  );
}

export default Home;