import { FormEvent, useEffect } from 'react';
import { LoginFormProps } from '../../types';
import InputControl from '../InputControl';
import useWarnings from '../../hooks/useWarnings';
import SubmitButton from '../SubmitButton';


function LoginForm({ refetch, isLoadingRefetch, isError, errorFields, setCredentials, isValid, fields }: LoginFormProps) {
  const {
    handleWarnings,
    displayWarning,
    emailWarning,
    passwordWarning
  } = useWarnings(isValid, isError);

  useEffect(() => {
    if (isError) handleWarnings(errorFields, 'login');
  }, [errorFields]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isValid) {
      refetch();
    } else {
      handleWarnings(fields);
    }
  }

  return (
    <form id="login-form" onSubmit={handleFormSubmit}>
      <InputControl
        subject="email"
        setFormState={setCredentials}
        displayWarning={displayWarning}
        handleWarnings={handleWarnings}
        subjectWarning={emailWarning}
      />

      <InputControl
        subject="password"
        setFormState={setCredentials}
        displayWarning={displayWarning}
        handleWarnings={handleWarnings}
        subjectWarning={passwordWarning}
      />

      <SubmitButton
        isLoading={isLoadingRefetch}
        sourceForm="login"
      />
    </form>
  );
}

export default LoginForm;