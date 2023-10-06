import { FormHelperText } from '@chakra-ui/react';
import { LoginInputSubject } from '../../types';
import useTextSubject from '../../hooks/useTextSubject';

type HelperTextProps = {
  isInvalid: boolean;
  warningMessage: string;
  subject: LoginInputSubject;
}

function HelperText({ subject, isInvalid, warningMessage }: HelperTextProps) {
  const { subjectText } = useTextSubject(subject, isInvalid, warningMessage);

  return (
    <FormHelperText mt="0.5">{subjectText}</FormHelperText>
  );
}

export default HelperText;