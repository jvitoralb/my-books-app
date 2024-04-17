import { useState } from 'react';
import { Grid } from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import SettingsSidebar from './SettingsSidebar';
import SettingsArea from './SettingsArea';
import useSidebarState from '../../hooks/useSidebarState';
import { EmailSettings, PasswordSettings, User } from '../../types';
import './styles/settings.css';

type SettingsProps = {
  user: User;
  emailSettings: EmailSettings;
  pswdSettings: PasswordSettings;
}

function Settings({ user, emailSettings, pswdSettings }: SettingsProps) {
  const [ currentSetting, setCurrentSetting ] = useState('account-overview');

  const {
    isSidebarOpen,
    setIsOpen,
    isSidebarResponsiveSize,
    setIsActive,
  } = useSidebarState();
  
  const handleCurrentSetting = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    let targetElem = e.target as HTMLHeadingElement;

    if (targetElem.id !== currentSetting) {
      setCurrentSetting(targetElem.id);
    }
  }

  return (
    <main>
      <Grid
        templateAreas={`"nav main"`}
        gridTemplateRows={"auto"}
        gridTemplateColumns={isSidebarResponsiveSize ? '0 4fr' : '1fr 4fr'}
        h="90vh"
        gap="1"
      >
        <Sidebar
          setIsActive={setIsActive}
          setIsOpen={setIsOpen}
          content={
            <SettingsSidebar
              handleCurrentSetting={handleCurrentSetting}
              currentSetting={currentSetting}
            />
          }
        />

        <SettingsArea
          user={user}
          currentSettingArea={currentSetting}
          emailSettings={emailSettings}
          pswdSettings={pswdSettings}
          isSidebarOpen={isSidebarOpen}
        />
      </Grid>
    </main>
  );
}

export default Settings;