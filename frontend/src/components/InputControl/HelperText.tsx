import { FormHelperText } from '@chakra-ui/react';
import { InputSubject } from '../../types';
import useTextSubject from './hooks/useTextSubject';

type HelperTextProps = {
  isInvalid: boolean;
  warningMessage: string;
  subject: InputSubject;
  customText?: string;
}

function HelperText({ subject, customText, isInvalid, warningMessage }: HelperTextProps) {
  const { subjectText } = useTextSubject(subject, isInvalid, warningMessage, customText);

  return (
    <FormHelperText mt="0.5">{subjectText}</FormHelperText>
  );
}

export default HelperText;