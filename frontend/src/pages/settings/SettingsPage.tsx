import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Settings from '../../components/Settings';
import useUserInfo from './hooks/useUserInfo';
import useEmailSettings from './hooks/useEmailSettings';
import useEmailMutation from './hooks/useEmailMutation';
import usePasswordSettings from './hooks/usePasswordSettings';
import usePasswordMutation from './hooks/usePasswordMutation';
import { User } from '../../types';


function SettingsPage() {
  const loaderUserInfo = useLoaderData() as User;
  const {
    user,
    refreshUserInfo,
  } = useUserInfo(loaderUserInfo);

  const {
    emailSendUpdates,
    emailStatus,
    emailError,
  } = useEmailMutation();

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
  } = usePasswordMutation();

  const {
    pswdIsValid,
    pswdFields,
    pswdState,
    setPswdValues
  } = usePasswordSettings(pswdStatus);

  useEffect(() => {
    if (emailStatus === 'success') {
      refreshUserInfo();
    }
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