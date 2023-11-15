import { useLoaderData } from 'react-router-dom';
import { User } from '../../types';
import Settings from '../../components/Settings';


function SettingsPage() {
  const user = useLoaderData() as User;

  return (
    <Settings
      user={user}
    />
  );
}

export default SettingsPage;