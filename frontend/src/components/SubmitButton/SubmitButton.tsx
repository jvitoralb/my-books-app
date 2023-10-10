import { Button } from '@chakra-ui/react';
import { firstCharToUpper } from '../../utils/strings';

type SubmitButtonProps = {
  sourceForm: string;
  isLoading: boolean;
}

function SubmitButton({ sourceForm, isLoading }: SubmitButtonProps) {
  return (
    <Button
      id={`${sourceForm}-submit`}
      isLoading={isLoading}
      type="submit"
      m="2"
    >
      {firstCharToUpper(sourceForm)}
    </Button>
  );
}

export default SubmitButton;