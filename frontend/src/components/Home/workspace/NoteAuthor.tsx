import { Text } from '@chakra-ui/react';
import EditableInput from '../../EditableElements/EditableInput';
import useEditableText from '../hooks/useEditableText';

type NoteAuthorProps = {
  authorText: string | null;
  workNoteId: string;
  inputName: "author";
}

function NoteAuthor({ workNoteId, authorText, inputName }: NoteAuthorProps) {
  const {
    switchOn,
    switchOff,
    onChange,
    value,
    isEditing,
  } = useEditableText({
    noteId: workNoteId,
    noteFieldName: inputName,
    noteFieldText: authorText,
  });

  return (
    <>
      <Text minW="10vw" color="GrayText" pt="3px" fontSize="sm" className="workspace-note-heading">Author</Text>
      {
        isEditing ? 
        <EditableInput
          value={value}
          inputName={inputName}
          inputId={`${inputName}_${workNoteId}`}
          updateOnBlur={switchOff}
          updateOnChange={onChange}
          customAttr={{
            maxWidth: "75vw",
            maxLength: 75
          }}
        /> : 
        <Text
          py="4px"
          px="6px"
          mx="12px"
          maxW="75vw"
          height={!value ? "28px" : undefined}
          onDoubleClick={switchOn}
        >
          {value}
        </Text>
      }
    </>
  );
}

export default NoteAuthor;