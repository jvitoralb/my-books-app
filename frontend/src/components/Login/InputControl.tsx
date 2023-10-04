import { ChangeEvent } from 'react';
import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { InputControlProps } from '../../types';
import useInputSubject from '../../hooks/useInputSubject';


function InputControl({ subject, setCredentials, displayWarning, handleWarnings, emailWarning, passwordWarning }: InputControlProps) {
  const {
    warningMsg,
    isInputInvalid
  } = useInputSubject({
    subject,
    displayWarning,
    emailWarning,
    passwordWarning
  });

  const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (displayWarning) handleWarnings(null);
    setCredentials(e.target.name, e.target.value);
  }

  return (
    <FormControl m="1" isInvalid={isInputInvalid}>
      <FormLabel htmlFor={subject}>{subject}</FormLabel>

      <Input
        required
        id={subject}
        name={subject}
        type={subject}
        placeholder={subject === 'email' ? "my-mail@books.app" : ""}
        onChange={handleInputsChange}
      />

      {
        isInputInvalid ?
        <FormHelperText mt="0.5">{warningMsg}</FormHelperText> :
        <FormHelperText mt="0.5">We'll never share your {subject}.</FormHelperText>
      }
    </FormControl>
  );
}

export default InputControl;