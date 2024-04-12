import { ChangeEvent } from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { InputControlProps } from '../../types';
import useInputSubject from './hooks/useInputSubject';
import HelperText from './HelperText';


function InputControl({ subject, value, inputType, setFormState, displayWarning, handleWarnings, subjectWarning, customText }: InputControlProps) {
  const {
    isInvalid,
    warningMessage,
    defaultLabel,
    defaultPlaceHolder
  } = useInputSubject({
    subject,
    displayWarning,
    subjectWarning
  });

  const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (displayWarning) handleWarnings(null);
    setFormState(e.target.name, e.target.value);
  }

  return (
    <FormControl m="1" isInvalid={isInvalid}>
      <FormLabel htmlFor={subject}>{defaultLabel}</FormLabel>

      <Input
        required
        id={subject}
        name={subject}
        type={inputType ? inputType : subject}
        onChange={handleInputsChange}
        placeholder={defaultPlaceHolder}
        autoComplete="on"
        value={value}
      />

      <HelperText
        isInvalid={isInvalid}
        subject={subject}
        warningMessage={warningMessage}
        customText={customText}
      />
    </FormControl>
  );
}

export default InputControl;