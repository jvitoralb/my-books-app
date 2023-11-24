import { useLoaderData } from 'react-router-dom';
import { User } from '../../types';
import Settings from '../../components/Settings';
import useAuth from '../../hooks/useAuth';
import useEmailSettings from '../../hooks/useEmailSettings';
import useEmailMutation from '../../hooks/useEmailMutation';
import usePasswordSettings from '../../hooks/usePasswordSettings';
import usePasswordMutation from '../../hooks/usePasswordMutation';


function SettingsPage() {
  const { token } = useAuth({
    operation: 'GET'
  });

  const {
    emailSendUpdates,
    emailStatus,
    emailError
  } = useEmailMutation(token);

  const {
    emailState,
    setEmailValues,
    emailIsValid,
    emailFields
  } = useEmailSettings(emailStatus);

  const {
    pswdSendUpdates,
    pswdStatus,
    pswdError
  } = usePasswordMutation(token);

  const {
    pswdIsValid,
    pswdFields,
    pswdState,
    setPswdValues
  } = usePasswordSettings(pswdStatus);

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
        status: emailStatus,
        error: emailError
      }}
      pswdSettings={{
        setPswdValues,
        stateValues: pswdState,
        isValid: pswdIsValid,
        fields: pswdFields,
        sendUpdates: pswdSendUpdates,
        status: pswdStatus,
        error: pswdError
      }}
    />
  );
}

export default SettingsPage;