import { Heading, Input, Text, Textarea } from '@chakra-ui/react';
import useEditableText from '../../../hooks/useEditableText';

type EditableTextProps = {
  textValue: string | null;
  inputName: string;
  workNoteId: string;
}

function EditableText({ workNoteId, textValue, inputName }: EditableTextProps) {
  const {
    switchOn,
    switchOff,
    onChange,
    value,
    isEditing,
  } = useEditableText({
    noteId: workNoteId,
    noteFieldName: inputName,
    noteFieldText: textValue,
  });

  return (
    isEditing ? 
    (
      inputName === 'about' ? 
      <EditableTextArea
        value={value}
        inputName={inputName}
        inputId={`${inputName}_${workNoteId}`}
        updateOnBlur={switchOff}
        updateOnChange={onChange}
      /> : 
      <EditableInput
        value={value}
        inputName={inputName}
        inputId={`${inputName}_${workNoteId}`}
        updateOnBlur={switchOff}
        updateOnChange={onChange}
      />
    ) : 
    (
      inputName === 'title' ? 
      <Heading
        as="h3"
        size="md"
        onDoubleClick={switchOn}
      >
        {value}
      </Heading> : 
      <Text
      onDoubleClick={switchOn}
      py="4px"
      minW="60vw"
      maxW="67vw"
      noOfLines={[4, 5, 6]}
    >
      {value}
    </Text>
    )
  );
}

type EditableElemProps =  {
  inputId: string;
  inputName: string;
  value: string;
  updateOnBlur: () => void;
  updateOnChange: (field: string, value: string) => void;
}

function EditableTextArea({ inputId, inputName, value, updateOnBlur, updateOnChange }: EditableElemProps) {
  return (
    <Textarea
      id={inputId}
      name={inputName}
      value={value}
      size="sm"
      px="0px"
      py="4px"
      fontSize="16px"
      lineHeight="24px"
      variant="unstyled"
      resize="none"
      height="24vh"
      minW="60vw"
      maxW="67vw"
      maxLength={500}
      noOfLines={[4, 5, 6]}
      autoFocus={true}
      onBlur={updateOnBlur}
      onChange={(e) => updateOnChange(e.target.id, e.target.value)}
    />
  );
}

function EditableInput({ inputId, inputName, value, updateOnBlur, updateOnChange }: EditableElemProps) {
  return (
    <Input
      id={inputId}
      name={inputName}
      value={value}
      size="sm"
      px="0px"
      py="4px"
      fontSize="16px"
      variant="unstyled"
      autoComplete="off"
      maxLength={100}
      autoFocus={true}
      onBlur={updateOnBlur}
      onChange={(e) => updateOnChange(e.target.id, e.target.value)}
    />
  );
}

export default EditableText;