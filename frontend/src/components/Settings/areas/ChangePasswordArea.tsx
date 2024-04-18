import { FormEvent } from 'react';
import { Heading } from '@chakra-ui/react';
import InputControl from '../../InputControl';
import SubmitButton from '../../SubmitButton';
import { PasswordSettings } from '../../../types';
import useWarningsPasswordSettings from '../hooks/useWarningsPasswordSettings';
import useSettingsStatusHandler from '../hooks/useSettingsStatusHandler';


function PasswordSettingsArea({ setPswdValues, stateValues, isValid, fields, sendUpdates, status, error }: PasswordSettings) {
  const {
    displayWarning,
    handleWarnings,
    newPswdWarning,
    confirmNewPswdWarning
  } = useWarningsPasswordSettings(isValid, status === 'error');

  const { statusElem } = useSettingsStatusHandler({
    area: 'password',
    isError: status === 'error',
    error: error,
    isSuccess: status === 'success'
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValid) {
      sendUpdates({ new_password: stateValues.new_password });
    } else {
      handleWarnings(fields);
    }
  }

  return (
    <>
      <Heading as="h2" size="md" mb="12px" fontWeight="semibold">
        Password Settings
      </Heading>

      <form id="update-password-form" onSubmit={handleFormSubmit} className="flex-center-form">
        <InputControl
          subject="new_password"
          inputType="password"
          setFormState={setPswdValues}
          displayWarning={displayWarning}
          handleWarnings={handleWarnings}
          subjectWarning={newPswdWarning}
          value={stateValues.new_password}
          customText='Should be at least 8 characters long.'
        />

        <InputControl
          subject="confirm_new_password"
          inputType="password"
          setFormState={setPswdValues}
          displayWarning={displayWarning}
          handleWarnings={handleWarnings}
          subjectWarning={confirmNewPswdWarning}
          value={stateValues.confirm_new_password}
        />

        <SubmitButton
          isLoading={status === 'loading'}
          sourceForm="update-password"
        />
      </form>

      { statusElem }
    </>
  );
}

export default PasswordSettingsArea;