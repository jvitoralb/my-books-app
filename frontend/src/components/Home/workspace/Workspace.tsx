import { Box, Flex, GridItem, Text } from '@chakra-ui/react';
import { MutationStatus } from '@tanstack/react-query';
import EditableText from './EditableText';
import NoteSettings from './NoteSettings';
import { BookNote } from '../../../types';

type WorkspaceProps = {
  username: string;
  workNote: BookNote | null;
  updateNote: (noteId: string) => void;
  deleteNote: (noteId: string) => void;
  deleteStatus: MutationStatus;
}

function Workspace({ username, workNote, updateNote, deleteNote, deleteStatus }: WorkspaceProps) {
  return (
    <GridItem
      id="workspace"
      area={"main"}
      p="8px"
      shadow="md"
      borderWidth="1px"
    >
      {
        !workNote ?
        <Text>Hello, {username}</Text> :
        <>
          <Flex justifyContent="space-between" alignItems="baseline">
            <EditableText
              workNoteId={workNote.id}
              textValue={workNote.title}
              inputName="title"
            />
            <NoteSettings
              updateNote={updateNote}
              deleteNote={deleteNote}
              deleteStatus={deleteStatus}
              workNoteId={workNote.id}
            />
          </Flex>

          <Flex>
            <Text minW="10vw" color="GrayText" py="4px">Author</Text>
            <EditableText
              workNoteId={workNote.id}
              textValue={workNote.author}
              inputName="author"
            />
          </Flex>

          <Flex>
            <Text minW="10vw" color="GrayText" py="4px">About</Text>
            <EditableText
              workNoteId={workNote.id}
              textValue={workNote.about}
              inputName="about"
            />
          </Flex>

          <Box>{workNote.section}</Box>
        </>
      }
    </GridItem>
  );
}

export default Workspace;