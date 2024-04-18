import { Textarea } from '@chakra-ui/react';
import useCustomAttributes from './hooks/useCustomAttributes';
import useTextAreaRowLimit from './hooks/useTextAreaRowLimit';
import { EditableTextAreaAttr } from '../../types';

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

  const { limitRowsOnChange } = useTextAreaRowLimit({
    numberOfLines,
    updateStateOnChange: updateOnChange
  });

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
      lineHeight="20px"
      variant="unstyled"
      resize="none"
      ref={refObserver}
      height={height}
      maxW={maxWidth}
      maxLength={maxLength}
      overflow="hidden"
      autoFocus={true}
      onBlur={updateOnBlur}
      onChange={limitRowsOnChange}
    />
  );
}

export default EditableTextArea;