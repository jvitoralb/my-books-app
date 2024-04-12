import { Grid } from '@chakra-ui/react';
import Sidebar from './sidebar/Sidebar';
import Workspace from './workspace/Workspace';
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

  return (
    <Grid
      templateAreas={`"nav main"`}
      gridTemplateRows={"auto"}
      gridTemplateColumns={"1fr 4fr"}
      h="90vh"
      gap="1"
    >
      <Sidebar
        user={user}
        books={{
          ...books,
          selectNote,
          selectedUpdateNote,
          selectedDeleteNote
        }}
      />

      <Workspace
        username={user.name}
        workNote={selectedNote}
        updateNote={books.updateBookNote}
        deleteNote={books.deleteBookNote}
        deleteStatus={books.deleteStatus}
      />
    </Grid>
  );
}

export default Home;