import { GridItem, Heading, Divider } from '@chakra-ui/react';
import { treatLabelsHyphen } from '../../utils/strings';
import { ThemeManager } from '../../types';

type SettingsSidebarProps = {
  theme: ThemeManager;
  handleCurrentSetting: (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => void;
  currentSetting: string;
}

function SettingsSidebar({ theme, handleCurrentSetting, currentSetting }: SettingsSidebarProps) {
  const settingsOptions = ['account-overview', 'email-settings', 'password-settings'];

  return (
    <GridItem
      area="nav"
      p="6px"
      shadow="md"
      borderWidth="1px"
      overflowY="auto"
      h="90vh"
    >
      <ul id="settings-nav-options" className="settings-options-list">
        {
          settingsOptions.map((opt, idx) => (
            <li key={`${opt}-${idx}`} id={`${opt}-${idx}-list-item`}>
              {idx !== 0 && <Divider borderColor="gray.400" />}
              <Heading
                onClick={handleCurrentSetting}
                id={opt}
                as="h2"
                size="sm"
                fontWeight="semibold"
                py="16px"
                my="3px"
                className={
                  `settings-options ${theme.currentTheme === 'dark' && 'settings-options-dark'} ` + 
                  `${opt === currentSetting ? 'option-selected' : ''}${theme.currentTheme === 'dark' ? '-dark' : ''}`
                }
              >
                {treatLabelsHyphen(opt)}
              </Heading>
            </li>
          ))
        }
      </ul>
    </GridItem>
  );
}

export default SettingsSidebar;