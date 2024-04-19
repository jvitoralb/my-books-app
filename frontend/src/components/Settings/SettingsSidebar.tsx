import { GridItem, Heading, Divider } from '@chakra-ui/react';
import { treatLabelsHyphen } from '../../utils/strings';

type SettingsSidebarProps = {
  handleCurrentSetting: (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => void;
  currentSetting: string;
}

function SettingsSidebar({ handleCurrentSetting, currentSetting }: SettingsSidebarProps) {
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
                className={'settings-options' + (opt === currentSetting ? ' option-selected' : '')}
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