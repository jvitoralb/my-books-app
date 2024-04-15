import { Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import './styles/error.css';

type ErrorProps = {
  statusCode: number;
  statusMessage: string;
}

function Error({ statusCode, statusMessage }: ErrorProps) {
  return (
    <>
      <Header />
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        py="12px"
      >
        <Heading
          as="h1"
          size="2xl"
          py="12px"
          fontWeight="semibold"
        >
          {statusCode}
        </Heading>
        <Text
          py="12px"
          textAlign="center"
          lineHeight="30px"
        >
          {statusMessage}
          <br />
          You can always go <Link to='/' className='link'>home</Link>!
        </Text>
      </Flex>
    </>
  );
}

export default Error;