import { useLoaderData } from 'react-router-dom';
import Settings from '../../components/Settings';
import useEmailSettings from '../../hooks/useEmailSettings';
import { User } from '../../types';
import useEmailMutation from '../../hooks/useEmailMutation';
import useAuth from '../../hooks/useAuth';


function SettingsPage() {
  const { token } = useAuth({
    operation: 'GET'
  });

  const {
    emailSendUpdates,
    emailIsLoading,
    emailIsError,
    emailIsSuccess,
    emailError
  } = useEmailMutation(token);

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
        sendUpdates: emailSendUpdates,
        isLoading: emailIsLoading,
        isError: emailIsError,
        error: emailError,
        isSuccess: emailIsSuccess
      }}
    />
  );
}

export default SettingsPage;