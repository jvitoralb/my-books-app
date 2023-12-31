import { Grid } from '@chakra-ui/react';
import { EmailSettings, PasswordSettings, User } from '../../types';
import { useState } from 'react';
import Sidebar from './Sidebar';
import SettingsArea from './SettingsArea';

type SettingsProps = {
  user: User;
  emailSettings: EmailSettings;
  pswdSettings: PasswordSettings;
}

function Settings({ user, emailSettings, pswdSettings }: SettingsProps) {
  const [ currentSetting, setCurrentSetting ] = useState('account-overview');
  
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
        gridTemplateColumns={"1fr 3fr"}
        h="90vh"
      >
        <Sidebar
          handleCurrentSetting={handleCurrentSetting}
        />

        <SettingsArea
          user={user}
          currentSettingArea={currentSetting}
          emailSettings={emailSettings}
          pswdSettings={pswdSettings}
        />
      </Grid>
    </main>
  );
}

export default Settings;