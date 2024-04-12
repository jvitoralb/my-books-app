import { Input } from '@chakra-ui/react';
import useCustomAttributes, { EditableInputAttr } from './hooks/useCustomAttributes';

type EditableElemProps =  {
  inputId: string;
  inputName: string;
  value: string;
  updateOnBlur: () => void;
  updateOnChange: (field: string, value: string) => void;
  customAttr: EditableInputAttr
}

function EditableInput({ inputId, inputName, value, updateOnBlur, updateOnChange, customAttr }: EditableElemProps) {
  const {
    maxLength,
    maxWidth,
  } = useCustomAttributes(customAttr, 'input');

  return (
    <Input
      id={inputId}
      name={inputName}
      value={value}
      size="sm"
      py="4px"
      px="4px"
      mx="12px"
      fontSize="16px"
      variant="unstyled"
      autoComplete="off"
      maxW={maxWidth}
      maxLength={maxLength}
      autoFocus={true}
      onBlur={updateOnBlur}
      onChange={(e) => updateOnChange(e.target.id, e.target.value)}
    />
  );
}

export default EditableInput;