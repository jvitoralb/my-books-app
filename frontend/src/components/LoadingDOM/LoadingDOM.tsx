import { Flex, Spinner } from '@chakra-ui/react';


function LoadingDOM() {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      height="90vh"
    >
      <Spinner size='xl' />
    </Flex>
  );
}

export default LoadingDOM;