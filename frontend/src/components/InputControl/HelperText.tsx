import { FormHelperText, Text } from '@chakra-ui/react';
import useTextSubject from './hooks/useTextSubject';
import { InputSubject } from '../../types';

type HelperTextProps = {
  isInvalid: boolean;
  warningMessage: string;
  subject: InputSubject;
  customText?: string;
}

function HelperText({ subject, customText, isInvalid, warningMessage }: HelperTextProps) {
  const { subjectText } = useTextSubject(subject, isInvalid, warningMessage, customText);

  return (
    <FormHelperText
      as={Text}
      mt="0.5"
      className={isInvalid ? 'error-message' : ''}
    >
      {subjectText}
    </FormHelperText>
  );
}

export default HelperText;