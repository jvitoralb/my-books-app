import { Flex, Text, Heading, IconButton, VStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import useSortedNotes from '../../../hooks/useSortedNotes';
import { BookNoteProps } from '../../../types';


function BooksNotesArea({ notes, createBookNote, createStatus, selectNote, selectedUpdateNote }: BookNoteProps) {
  useSortedNotes(notes);

  const handleNoteClick = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    selectNote!(e.currentTarget.id);
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
            <Text noOfLines={1}
              key={`note-${note.id}-${idx}`}
              id={note.id}
              title={note.title}
              onClick={handleNoteClick}
              as={(selectedUpdateNote?.id === note.id) ? 'i' : undefined}
            >
              {(selectedUpdateNote?.id === note.id) ? 'Saving...' : note.title}
            </Text>
          ))
        }
      </VStack>
    </>
  );
}

export default BooksNotesArea;