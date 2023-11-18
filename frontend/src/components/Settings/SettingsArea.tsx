import { Flex, GridItem } from '@chakra-ui/react';
import { EmailSettings, User } from '../../types';
import AccountOverviewArea from './areas/AccountOverviewArea';
import ChangeEmailArea from './areas/ChangeEmailArea';
import PasswordSettingsArea from './areas/PasswordSettingsArea';

type SettingsAreaProps = {
  user: User;
  currentSettingArea: string;
  emailSettings: EmailSettings;
}

type AreasMap = {
  'account-overview': JSX.Element;
  'email-settings': JSX.Element;
  'password-settings': JSX.Element;
}

type Areas = keyof AreasMap;

function SettingsArea({ user, currentSettingArea, emailSettings }: SettingsAreaProps) {
  const areasMap: AreasMap = {
    'account-overview':
      <AccountOverviewArea
        name={user.name}
        email={user.email}
      />,
    'email-settings':
      <ChangeEmailArea
        {...emailSettings}
      />,
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