import { Flex, GridItem, Text } from '@chakra-ui/react';
import { MutationStatus } from '@tanstack/react-query';
import NoteSettings from './NoteSettings';
import NoteTitle from './NoteTitle';
import NoteAuthor from './NoteAuthor';
import NoteAbout from './NoteAbout';
import NoteSection from './NoteSection';
import { BookNote } from '../../../types';
import '../styles/workspace.css';

type WorkspaceProps = {
  username: string;
  workNote: BookNote | null;
  updateNote: (noteId: string) => void;
  deleteNote: (noteId: string) => void;
  deleteStatus: MutationStatus;
  sidebarOpen: boolean;
}

function Workspace({ username, workNote, updateNote, deleteNote, deleteStatus, sidebarOpen }: WorkspaceProps) {
  return (
    <GridItem
      id="workspace"
      area={"main"}
      p="8px"
      shadow="md"
      borderWidth="1px"
      overflowY="scroll"
      className={sidebarOpen ? 'lose-focus' : 'focus'}
    >
      {
        !workNote ?
        <Text marginLeft="24px" padding="18px" fontWeight="medium">
          Hello, {username}!
          <br />
          What are we doing today?
        </Text> :
        <>
          <Flex justifyContent="space-between" alignItems="baseline">
            <NoteTitle
              workNoteId={workNote.id}
              titleText={workNote.title}
              inputName="title"
            />
            <NoteSettings
              updateNote={updateNote}
              deleteNote={deleteNote}
              deleteStatus={deleteStatus}
              workNoteId={workNote.id}
            />
          </Flex>

          <NoteAuthor
            workNoteId={workNote.id}
            authorText={workNote.author}
            inputName="author"
          />
          <NoteAbout
            workNoteId={workNote.id}
            aboutText={workNote.about}
            inputName="about"
          />
          <NoteSection
            workNoteId={workNote.id}
            sectionText={workNote.section}
            inputName="section"
          />
        </>
      }
    </GridItem>
  );
}

export default Workspace;