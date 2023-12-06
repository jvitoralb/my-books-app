import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { User } from '../../types';
import Settings from '../../components/Settings';
import useAuth from '../../hooks/useAuth';
import useEmailSettings from './hooks/useEmailSettings';
import useEmailMutation from './hooks/useEmailMutation';
import usePasswordSettings from './hooks/usePasswordSettings';
import usePasswordMutation from './hooks/usePasswordMutation';


function SettingsPage() {
  const user = useLoaderData() as User;

  const {
    token,
    updateAuth
  } = useAuth();

  const {
    emailSendUpdates,
    emailStatus,
    emailError,
    emailMutationRes
  } = useEmailMutation(token);

  const {
    emailState,
    setEmailValues,
    emailIsValid,
    emailFields
  } = useEmailSettings(user.email, emailStatus);

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

  useEffect(() => {
    if (emailStatus === 'success') updateAuth(emailMutationRes);
  }, [emailStatus]);

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