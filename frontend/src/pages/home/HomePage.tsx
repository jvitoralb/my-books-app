import { useLoaderData } from 'react-router-dom';
import Home from '../../components/Home';
import useBooksQuery from './hooks/useBooksQuery';
import useBooksMutation from './hooks/useBooksMutation';
import useNotesManager from './hooks/useNotesManager';
import { User, BookNote } from '../../types';

type HomeLoaderData = [User, BookNote[] | []];

function HomePage() {
  const [ user, books ] = useLoaderData() as HomeLoaderData;

  const {
    fetchBooks,
    fetchResult
  } = useBooksQuery();

  const {
    createBookNote,
    createStatus,
    newNote,
    updateBookNote,
    updateStatus,
    deleteBookNote,
    deleteStatus,
  } = useBooksMutation();

  const notesTracked = useNotesManager({
    notes: books,
    createStatus,
    newNote,
    updateStatus,
    deleteStatus,
    fetchBooks,
    fetchResult,
  });

  return (
    <Home
      user={user}
      books={{
        notes: notesTracked,
        createBookNote,
        createStatus,
        newNote,
        updateBookNote,
        updateStatus,
        deleteBookNote,
        deleteStatus,
      }}
    />
  );
}

export default HomePage;