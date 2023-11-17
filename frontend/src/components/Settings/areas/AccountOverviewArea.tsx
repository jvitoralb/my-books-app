import { Avatar, Text, Box, Divider, Heading } from '@chakra-ui/react';


function AccountOverviewArea({ name, email }: { name: string; email: string; }) {
  return (
    <>
      <Heading as="h2" size="md" mb="18px">
        Account Overview
      </Heading>

      <Avatar id="user-avatar" size="2xl" borderRadius="2px" m="8px" />

      <Box id="user-account-information-overview" py="12px">
        <Divider />
        <Text m="8px" px="5px">Name: {name}</Text>
        <Divider />
        <Text m="8px" px="5px">Email: {email}</Text>
        <Divider />
        <Text m="8px" px="5px">Password: ********</Text>
        <Divider />
      </Box>
    </>
  );
}

export default AccountOverviewArea;