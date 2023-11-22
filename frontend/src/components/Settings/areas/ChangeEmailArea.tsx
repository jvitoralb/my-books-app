import { FormEvent } from 'react';
import { Heading } from '@chakra-ui/react';
import InputControl from '../../InputControl';
import SubmitButton from '../../SubmitButton';
import { EmailSettings, EmailUpdates } from '../../../types';
import useWarningsEmailSettings from '../../../hooks/useWarningsEmailSettings';
import useSettingsStatusHandler from '../../../hooks/useSettingsStatusHandler';


function ChangeEmailArea({ setEmailValues, stateValues, isValid, fields, isLoading, sendUpdates, isError, error, isSuccess }: EmailSettings) {
  const {
    handleWarnings,
    displayWarning,
    emailWarning,
    newEmailWarning,
    confirmNewEmailWarning
  } = useWarningsEmailSettings(isValid, isError);

  const { statusElem } = useSettingsStatusHandler(isError, error, isSuccess);

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
          isLoading={isLoading}
          sourceForm="update-email"
        />
      </form>

      { statusElem }
    </>
  );
}

export default ChangeEmailArea;