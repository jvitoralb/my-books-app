import { Fragment } from 'react';
import { Text } from '@chakra-ui/react';
import EditableTextArea from '../../EditableElements/EditableTextArea';
import useEditableText from '../hooks/useEditableText';

type AboutProps = {
  aboutText: string | null;
  workNoteId: string;
  inputName: "about";
}

function NoteAbout({ workNoteId, inputName, aboutText }: AboutProps) {
  const {
    switchOn,
    switchOff,
    onChange,
    value,
    isEditing,
  } = useEditableText({
    noteId: workNoteId,
    noteFieldName: inputName,
    noteFieldText: aboutText,
  });
  
  return (
    <>
      <Text minW="10vw" color="GrayText" py="4px" fontSize="sm">About</Text>
      {
        isEditing ? 
        <EditableTextArea
          value={value}
          inputName={inputName}
          inputId={`${inputName}_${workNoteId}`}
          updateOnBlur={switchOff}
          updateOnChange={onChange}
          customAttr={{
            maxLength: 500,
            numberOfLines: [ 4, 5, 6 ],
          }}
        /> : 
        <Text
          py="4px"
          px="6px"
          mx="12px"
          maxW="75vw"
          noOfLines={[4, 5, 6]}
          onDoubleClick={switchOn}
        >
          {
            value
            .split(/\r|\n/)
            .map((pText: string, idx: number) => <Fragment key={idx}>{pText}<br /></Fragment>)
          }
        </Text>
      }
    </>
  );
}

export default NoteAbout;