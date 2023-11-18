import { FormEvent } from 'react';
import { Heading } from '@chakra-ui/react';
import InputControl from '../../InputControl';
import SubmitButton from '../../SubmitButton';
import { EmailSettings } from '../../../types';
import useWarningsEmailSettings from '../../../hooks/useWarningsEmailSettings';
import { getAuthData } from '../../../utils/auth';


function ChangeEmailArea({ setEmailUpdates, updates, isValid, fields, isLoading, mutate, isError }: EmailSettings) {
  const {
    handleWarnings,
    displayWarning,
    emailWarning,
    newEmailWarning,
    confirmNewEmailWarning
  } = useWarningsEmailSettings(isValid, isError);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValid) {
      // usar useAuth hook
      mutate({ updates, authorization: getAuthData().token });
    } else {
      handleWarnings(fields);
    }
  }

  return (
    <>
      <Heading as="h2" size="md" mb="18px">
        Email Settings
      </Heading>

      <form id="update-email-form" onSubmit={handleFormSubmit} className="flex-center-col">
        <InputControl
          subject="email"
          setFormState={setEmailUpdates}
          displayWarning={displayWarning}
          handleWarnings={handleWarnings}
          subjectWarning={emailWarning}
          customText={''}
        />

        <InputControl
          subject="new_email"
          setFormState={setEmailUpdates}
          displayWarning={displayWarning}
          handleWarnings={handleWarnings}
          subjectWarning={newEmailWarning}
        />

        <InputControl
          subject="confirm_new_email"
          setFormState={setEmailUpdates}
          displayWarning={displayWarning}
          handleWarnings={handleWarnings}
          subjectWarning={confirmNewEmailWarning}
        />

        <SubmitButton
          isLoading={isLoading}
          sourceForm="update-email"
        />
      </form>
    </>
  );
}

export default ChangeEmailArea;