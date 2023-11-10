import { Heading } from '@chakra-ui/react';


type HomeProps = {
  name: string;
  token: string
}

function Home({ name, token }: HomeProps) {
  return (
    <>
      <Heading as="h1" size="md">
        Hello, {name}
      </Heading>
      {/* user-area */}
      {/* sidebar */}
      {/* book-note-area */}
    </>
  );
}

export default Home;