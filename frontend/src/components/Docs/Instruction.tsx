import { Text } from '@chakra-ui/react';

type InstructionProps = {
  crud: string
  endpoint: string;
}

function Instruction({ crud, endpoint }: InstructionProps) {
  return (
    <Text>
      Send a <span className="docs-highlight">{crud}</span> request 
      to <span className="docs-highlight docs-endpoint">{endpoint}</span>
    </Text>
  );
}

export default Instruction;