import { FormEvent } from 'react';
import { Heading } from '@chakra-ui/react';
import InputControl from '../../InputControl';
import SubmitButton from '../../SubmitButton';
import { EmailSettings, EmailUpdates } from '../../../types';
import useWarningsEmailSettings from '../../../hooks/useWarningsEmailSettings';
import useSettingsStatusHandler from '../../../hooks/useSettingsStatusHandler';


function ChangeEmailArea({ setEmailValues, stateValues, isValid, fields, sendUpdates, status, error }: EmailSettings) {
  const {
    handleWarnings,
    displayWarning,
    emailWarning,
    newEmailWarning,
    confirmNewEmailWarning
  } = useWarningsEmailSettings(isValid, status === 'error');

  const { statusElem } = useSettingsStatusHandler({
    area: 'email',
    isError: status === 'error',
    error,
    isSuccess: status === 'success'
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updates: EmailUpdates = {
      email: stateValues.email,
      new_email: stateValues.new_email
    }

    if (isValid) {
      sendUpdates(updates);
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
          setFormState={setEmailValues}
          displayWarning={displayWarning}
          handleWarnings={handleWarnings}
          subjectWarning={emailWarning}
          customText={''}
          value={stateValues.email}
        />

        <InputControl
          subject="new_email"
          setFormState={setEmailValues}
          displayWarning={displayWarning}
          handleWarnings={handleWarnings}
          subjectWarning={newEmailWarning}
          value={stateValues.new_email}
        />

        <InputControl
          subject="confirm_new_email"
          setFormState={setEmailValues}
          displayWarning={displayWarning}
          handleWarnings={handleWarnings}
          subjectWarning={confirmNewEmailWarning}
          value={stateValues.confirm_new_email}
        />

        <SubmitButton
          isLoading={status === 'loading'}
          sourceForm="update-email"
        />
      </form>

      { statusElem }
    </>
  );
}

export default ChangeEmailArea;