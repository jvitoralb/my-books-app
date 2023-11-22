import { useLoaderData } from 'react-router-dom';
import Settings from '../../components/Settings';
import useEmailSettings from '../../hooks/useEmailSettings';
import { User } from '../../types';
import useEmailMutation from '../../hooks/useEmailMutation';


function SettingsPage() {
  const {
    emailMutate,
    emailIsLoading,
    emailIsError,
    emailIsSuccess
  } = useEmailMutation();

  const {
    emailState,
    setEmailValues,
    emailIsValid,
    emailFields
  } = useEmailSettings(emailIsSuccess);

  const user = useLoaderData() as User;

  return (
    <Settings
      user={user}
      emailSettings={{
        setEmailValues,
        stateValues: emailState,
        isValid: emailIsValid,
        fields: emailFields,
        mutate: emailMutate,
        isLoading: emailIsLoading,
        isError: emailIsError,
        isSuccess: emailIsSuccess
      }}
    />
  );
}

export default SettingsPage;