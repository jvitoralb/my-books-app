import { Flex, GridItem } from '@chakra-ui/react';
import { User } from '../../types';
import AccountOverviewArea from './areas/AccountOverviewArea';
import EmailSettingsArea from './areas/EmailSettingsArea';
import PasswordSettingsArea from './areas/PasswordSettingsArea';

type SettingsAreaProps = {
  user: User;
  currentSettingArea: string;
}

type AreasMap = {
  'account-overview': JSX.Element;
  'email-settings': JSX.Element;
  'password-settings': JSX.Element;
}

type Areas = keyof AreasMap;

function SettingsArea({ user, currentSettingArea }: SettingsAreaProps) {
  const areasMap: AreasMap = {
    'account-overview':
      <AccountOverviewArea
        name={user.name}
        email={user.email}
      />,
    'email-settings': <EmailSettingsArea />,
    'password-settings': <PasswordSettingsArea />
  }

  const isValidArea = (value: string): value is Areas => {
    return value in areasMap;
  }

  return (
    <Flex
      as={GridItem}
      area="main"
      flexDirection="column"
      alignItems="center"
      p="16px"
    >
      {isValidArea(currentSettingArea) && areasMap[currentSettingArea]}
    </Flex>
  );
}

export default SettingsArea;