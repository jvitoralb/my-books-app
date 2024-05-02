import { Flex, GridItem } from '@chakra-ui/react';
import AccountOverviewArea from './areas/AccountOverviewArea';
import ChangeEmailArea from './areas/ChangeEmailArea';
import PasswordSettingsArea from './areas/ChangePasswordArea';
import { EmailSettings, PasswordSettings, ThemeManager, User } from '../../types';

type SettingsAreaProps = {
  theme: ThemeManager;
  user: User;
  currentSettingArea: string;
  emailSettings: EmailSettings;
  pswdSettings: PasswordSettings;
  isSidebarOpen: boolean;
}

type AreasMap = {
  'account-overview': JSX.Element;
  'email-settings': JSX.Element;
  'password-settings': JSX.Element;
}

type Areas = keyof AreasMap;

function SettingsArea({ theme, user, currentSettingArea, emailSettings, pswdSettings, isSidebarOpen }: SettingsAreaProps) {
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
      shadow="md"
      borderWidth="1px"
      flexDirection="column"
      alignItems="center"
      p="16px"
      className={isSidebarOpen ? (theme.currentTheme == 'dark' ? 'settings-lose-focus-dark' : 'settings-lose-focus') : 'settings-focus'}
    >
      {isValidArea(currentSettingArea) && areasMap[currentSettingArea]}
    </Flex>
  );
}

export default SettingsArea;