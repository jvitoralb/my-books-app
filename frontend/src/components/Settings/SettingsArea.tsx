import { Flex, GridItem } from '@chakra-ui/react';
import { EmailSettings, PasswordSettings, User } from '../../types';
import AccountOverviewArea from './areas/AccountOverviewArea';
import ChangeEmailArea from './areas/ChangeEmailArea';
import PasswordSettingsArea from './areas/ChangePasswordArea';

type SettingsAreaProps = {
  user: User;
  currentSettingArea: string;
  emailSettings: EmailSettings;
  pswdSettings: PasswordSettings;
}

type AreasMap = {
  'account-overview': JSX.Element;
  'email-settings': JSX.Element;
  'password-settings': JSX.Element;
}

type Areas = keyof AreasMap;

function SettingsArea({ user, currentSettingArea, emailSettings, pswdSettings }: SettingsAreaProps) {
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
    'password-settings':
      <PasswordSettingsArea
        {...pswdSettings}
      />
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