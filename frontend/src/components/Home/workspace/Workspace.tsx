import { Box, Flex, GridItem, Heading, Text } from '@chakra-ui/react';
import EditableText from './EditableText';
import { BookNote } from '../../../types';
import { MutationStatus } from '@tanstack/react-query';
import NoteSettings from './NoteSettings';

type WorkspaceProps = {
  username: string;
  workNote: BookNote | null;
  deleteNote: (noteId: string) => void;
  deleteStatus: MutationStatus;
}

function Workspace({ username, workNote, deleteNote, deleteStatus }: WorkspaceProps) {
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
            <Heading as="h3" size="md">{workNote.title}</Heading>
            <NoteSettings
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
              textarea={true}
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