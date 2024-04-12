import { Fragment } from 'react';
import { Box, Text } from '@chakra-ui/react';
import EditableTextArea from '../../EditableElements/EditableTextArea';
import useHeightObserver from '../hooks/useHeightObserver';
import useEditableText from '../hooks/useEditableText';

type NoteSectionProps = {
  sectionText: string | null;
  workNoteId: string;
  inputName: "section";
}

function NoteSection({ sectionText, workNoteId, inputName }: NoteSectionProps) {
  const {
    switchOn,
    switchOff,
    onChange,
    value,
    isEditing,
  } = useEditableText({
    noteId: workNoteId,
    noteFieldName: inputName,
    noteFieldText: sectionText,
  });

  const {
    height,
    divBoxObserver,
    textAreaObserver
  } = useHeightObserver();

  return (
    <>
      <Text minW="10vw" color="GrayText" py="4px" fontSize="sm">Note</Text>
      {
      isEditing ? 
      <EditableTextArea
        value={value}
        inputName={inputName}
        inputId={`${inputName}_${workNoteId}`}
        updateOnBlur={switchOff}
        updateOnChange={onChange}
        customAttr={{
          height: `${height}px`,
          minHeight: '50vh',
          refObserver: textAreaObserver,
        }}
      /> :
      <Box
        id={workNoteId}
        py="4px"
        px="6px"
        mx="12px"
        minH="50vh"
        maxW="75vw"
        ref={divBoxObserver}
        onDoubleClick={switchOn}
      >
        {
          value
          .split(/\r|\n/)
          .map((pText: string, idx: number) => <Fragment key={idx}>{pText}<br /></Fragment>)
        }
      </Box>
    }
    </>
  );
}

export default NoteSection;