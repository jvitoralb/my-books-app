import { useLoaderData } from 'react-router-dom';
import Settings from '../../components/Settings';
import useEmailSettings from '../../hooks/useEmailSettings';
import { User } from '../../types';
import useEmailMutation from '../../hooks/useEmailMutation';


function SettingsPage() {
  const {
    emailUpdates,
    setEmailUpdates,
    emailIsValid,
    emailFields
  } = useEmailSettings();

  const {
    emailMutationRes,
    emailMutate,
    emailIsLoading,
    emailIsError,
} = useEmailMutation();

  const user = useLoaderData() as User;

  return (
    <Settings
      user={user}
      emailSettings={{
        setEmailUpdates,
        updates: emailUpdates,
        isValid: emailIsValid,
        fields: emailFields,
        mutate: emailMutate,
        isLoading: emailIsLoading,
        isError: emailIsError
      }}
    />
  );
}

export default SettingsPage;