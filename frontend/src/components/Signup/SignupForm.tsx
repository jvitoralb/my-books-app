import { FormEvent, useEffect } from 'react';
import { SignupFormProps } from '../../types';
import InputControl from '../InputControl';
import useWarnings from '../../hooks/useWarnings';
import SubmitButton from '../SubmitButton';


function SignupForm({ mutate, isLoading, isError, errorFields, signupData, setSignupData, isValid, fields  }: SignupFormProps) {
  const {
    handleWarnings,
    displayWarning,
    emailWarning,
    passwordWarning
  } = useWarnings(isValid, isError);

  useEffect(() => {
    if (isError) handleWarnings(errorFields, 'signup');
  }, [errorFields]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValid) {
      mutate(signupData);
    } else {
      handleWarnings(fields);
    }
  }

  return (
    <form id="signup-form" onSubmit={handleFormSubmit} className="flex-center-col">
      <InputControl
        subject="name"
        inputType="text"
        setFormState={setSignupData}
        displayWarning={displayWarning}
        handleWarnings={handleWarnings}
        subjectWarning={''}
      />

      <InputControl
        subject="email"
        setFormState={setSignupData}
        displayWarning={displayWarning}
        handleWarnings={handleWarnings}
        subjectWarning={emailWarning}
      />

      <InputControl
        subject="password"
        setFormState={setSignupData}
        displayWarning={displayWarning}
        handleWarnings={handleWarnings}
        subjectWarning={passwordWarning}
      />

      <InputControl
        subject="confirm_password"
        inputType="password"
        setFormState={setSignupData}
        displayWarning={displayWarning}
        handleWarnings={handleWarnings}
        subjectWarning={passwordWarning}
      />

      <SubmitButton
        isLoading={isLoading}
        sourceForm="signup"
      />
    </form>
  );
}

export default SignupForm;