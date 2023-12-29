import { Text, Menu, MenuButton, IconButton, MenuList, MenuItem, AlertDialog, AlertDialogOverlay, AlertDialogContent, Flex, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, Heading } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { MutationStatus } from '@tanstack/react-query';
import useDeleteDialogConfig from '../../../hooks/useDeleteDialogConfig';

type NoteSettingsProps = {
  workNoteId: string;
  updateNote: (noteId: string) => void;
  deleteNote: (noteId: string) => void;
  deleteStatus: MutationStatus;
}

function NoteSettings({ workNoteId, updateNote, deleteNote, deleteStatus }: NoteSettingsProps) {
  const {
    isOpen,
    onOpen,
    onClose,
    cancelRef,
    overlayClick,
    setOverlayClick,
  } = useDeleteDialogConfig(deleteStatus);

  const handleDeleteNote = () => {
    deleteNote(workNoteId);
    setOverlayClick(false);
  }

  const handleUpdateNote = () => {
    updateNote(workNoteId);
  }

  return (
    <Menu id="note-settings-menu">
      <MenuButton
        as={IconButton}
        icon={<SettingsIcon />}
        variant="ghost"
      />

      <MenuList>
        <MenuItem id="save-changes-menu-item" fontSize="14px" onClick={handleUpdateNote}>
          Save changes
        </MenuItem>

        <MenuItem id="delete-note-menu-item" fontSize="14px" onClick={onOpen}>
          Delete note
        </MenuItem>

        <AlertDialog
          id="delete-note-alert-dialog"
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          closeOnOverlayClick={overlayClick}
        >
          <AlertDialogOverlay>
            <AlertDialogContent maxW="300px">
              <Flex as={AlertDialogHeader} justifyContent="center">
                <Heading as="h5" size="md">Delete note</Heading>
              </Flex>

              <Flex as={AlertDialogBody} justifyContent="center">
                <Text>You can't undo this action afterwards.</Text>
              </Flex>

              <Flex as={AlertDialogFooter} justifyContent="space-around">
                <Button id="cancel-delete-note-button" ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button id="delete-note-button" colorScheme="red" onClick={handleDeleteNote} isLoading={deleteStatus === 'loading'}>
                  Delete
                </Button>
              </Flex>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </MenuList>
    </Menu>
  );
}

export default NoteSettings;