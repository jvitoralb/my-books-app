import { Box, Heading, Text } from '@chakra-ui/react';
import EditableInput from '../../EditableElements/EditableInput';
import useEditableText from '../hooks/useEditableText';

type TitleProps = {
  titleText: string | null;
  workNoteId: string;
  inputName: "title";
}

function NoteTitle({ workNoteId, titleText, inputName }: TitleProps) {
  const {
    switchOn,
    switchOff,
    onChange,
    value,
    isEditing,
  } = useEditableText({
    noteId: workNoteId,
    noteFieldName: inputName,
    noteFieldText: titleText,
  });

  return (
    <Box>
      <Text minW="10vw" color="GrayText" py="4px" fontSize="sm">Title</Text>
      {
        isEditing ? 
        <EditableInput
          value={value}
          inputName={inputName}
          inputId={`${inputName}_${workNoteId}`}
          updateOnBlur={switchOff}
          updateOnChange={onChange}
          customAttr={{
            maxLength: 100
          }}
        /> : 
        <Heading
          as="h3"
          size="md"
          py="4px"
          px="4px"
          mx="12px"
          maxW="70vw"
          onDoubleClick={switchOn}
        >
          {value}
        </Heading>
      }
    </Box>
  );
}

export default NoteTitle;