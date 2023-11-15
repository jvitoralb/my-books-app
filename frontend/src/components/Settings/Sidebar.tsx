import { VStack, GridItem, StackDivider, Heading } from '@chakra-ui/react';
import { firstCharToUpper } from '../../utils/strings';

type SidebarProps = {
  handleCurrentSetting: (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => void;
}

function Sidebar({ handleCurrentSetting }: SidebarProps) {
  const settingsOptions = ['account-overview', 'email-settings', 'password-settings'];

  return (
    <VStack
      as={GridItem}
      area="nav"
      spacing={4}
      divider={<StackDivider borderColor="gray.200" />}
      borderRight="1px"
      py="16px"
    >
      {
        settingsOptions.map((opt, idx) => (
          <Heading
            key={`${opt}-${idx}`}
            onClick={handleCurrentSetting}
            id={opt}
            as="h2"
            size="sm"
          >
            {firstCharToUpper(opt.replace('-', ' '))}
          </Heading>
        ))
      }
    </VStack>
  );
}

export default Sidebar;