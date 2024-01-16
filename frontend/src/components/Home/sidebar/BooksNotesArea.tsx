import { Flex, Text, Heading, IconButton, VStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import useSortedNotes from '../../../hooks/useSortedNotes';
import useNotesOnChange from '../../../hooks/useNotesOnChange';
import { BookNoteProps } from '../../../types';


function BooksNotesArea({ notes, createBookNote, createStatus, selectNote, updateStatus, selectedUpdateNote, deleteStatus, selectedDeleteNote }: BookNoteProps) {
  useSortedNotes(notes);

  const {
    isEditing,
    updateNoteId,
    deleteNoteId,
  } = useNotesOnChange({
    notes,
    selectedUpdateNote,
    updateStatus,
    selectedDeleteNote,
    deleteStatus
  });

  const handleNoteClick = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    let currentNoteId = e.currentTarget.id;

    if (deleteNoteId === currentNoteId) return;
    selectNote!(currentNoteId);
  }

  return (
    <>
      <Flex alignItems="baseline" justifyContent="space-between">
        <Heading as="h3" size="sm" mt="45px" mb="5px">
          Books Notes
        </Heading>
        
        <IconButton
          aria-label="Add new book note"
          variant="ghost"
          size="sm"
          icon={<AddIcon />}
          title="Add new book note"
          onClick={createBookNote}
          isLoading={createStatus === 'loading'}
        />
      </Flex>

      <VStack align="start" spacing="3px">
        {
          !notes.length ?
          <p title="Create a new note...">Create a new note...</p> :
          notes.map((note, idx) => (
            <Text
              key={`note-${note.id}-${idx}`}
              id={note.id}
              title={note.title}
              noOfLines={1}
              onClick={handleNoteClick}
              color={isEditing(note.id) ? 'GrayText' : undefined}
              as={isEditing(note.id) ? 'i' : undefined}
            >
              {
                (updateNoteId === note.id) ? 'Saving...' : 
                (deleteNoteId === note.id) ? 'Deleting...' : 
                note.title
              }
            </Text>
          ))
        }
      </VStack>
    </>
  );
}

export default BooksNotesArea;