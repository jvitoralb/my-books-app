import { Grid } from '@chakra-ui/react';
import Sidebar from './sidebar/Sidebar';
import Workspace from './workspace/Workspace';
import { User } from '../../types';

type HomeProps = {
  user: User;
}

function Home({ user }: HomeProps) {
  return (
    <Grid
      templateAreas={`"nav main"`}
      gridTemplateRows={"auto"}
      gridTemplateColumns={"1fr 4fr"}
      h="90vh"
      gap="1"
    >
      <Sidebar
        user={user}
      />

      <Workspace
        name={user.name}
      />
    </Grid>
  );
}

export default Home;