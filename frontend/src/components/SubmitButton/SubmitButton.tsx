import { Button } from '@chakra-ui/react';
import { treatLabelsHyphen } from '../../utils/strings';

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
      {treatLabelsHyphen(sourceForm)}
    </Button>
  );
}

export default SubmitButton;