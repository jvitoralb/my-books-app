import { Textarea } from '@chakra-ui/react';
import useCustomAttributes, { EditableTextAreaAttr } from './hooks/useCustomAttributes';

type EditableTextAreaProps =  {
  inputId: string;
  inputName: string;
  value: string;
  updateOnBlur: () => void;
  updateOnChange: (field: string, value: string) => void;
  customAttr: EditableTextAreaAttr;
}

function EditableTextArea({ inputId, inputName, value, updateOnBlur, updateOnChange, customAttr }: EditableTextAreaProps) {
  const {
    height,
    maxWidth,
    maxLength,
    numberOfLines,
    refObserver
  } = useCustomAttributes(customAttr);

  return (
    <Textarea
      id={inputId}
      name={inputName}
      value={value}
      size="sm"
      py="4px"
      px="6px"
      mx="12px"
      fontSize="16px"
      lineHeight="24px"
      variant="unstyled"
      resize="none"
      ref={refObserver}
      height={height}
      maxW={maxWidth}
      maxLength={maxLength}
      noOfLines={numberOfLines}
      overflow="hidden"
      autoFocus={true}
      onBlur={updateOnBlur}
      onChange={(e) => updateOnChange(e.target.id, e.target.value)}
    />
  );
}

export default EditableTextArea;