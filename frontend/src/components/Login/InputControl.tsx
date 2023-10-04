import { ChangeEvent } from 'react';
import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { InputControlProps } from '../../types';
import useInputSubject from '../../hooks/useInputSubject';


function InputControl({ subject, setCredentials, displayWarning, handleWarnings, subjectWarning }: InputControlProps) {
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
    setCredentials(e.target.name, e.target.value);
  }

  return (
    <FormControl m="1" isInvalid={isInvalid}>
      <FormLabel htmlFor={subject}>{defaultLabel}</FormLabel>

      <Input
        required
        id={subject}
        name={subject}
        type={subject}
        placeholder={defaultPlaceHolder}
        onChange={handleInputsChange}
      />

      {
        isInvalid ?
        <FormHelperText mt="0.5">{warningMessage}</FormHelperText> :
        <FormHelperText mt="0.5">We'll never share your {subject}.</FormHelperText>
      }
    </FormControl>
  );
}

export default InputControl;