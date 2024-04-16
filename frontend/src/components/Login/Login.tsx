import { Heading } from '@chakra-ui/react';
import { LoginProps } from '../../types';
import LoginForm from './LoginForm';
import useErrorHandler from '../../hooks/useErrorHandler';
import './styles/login.css';


function LogIn({ refetch, isLoadingRefetch, isError, error, setCredentials, isValid, fields }: LoginProps) {
  const {
    errorFields,
    warnElement
  } = useErrorHandler(isError, error);

  return (
    <main>
      <section id="login-section" className="login-section">
        <Heading as="h4" size="md" mb="2" fontWeight="semibold">Login</Heading>

        <LoginForm
          refetch={refetch}
          isLoadingRefetch={isLoadingRefetch}
          isError={isError}
          errorFields={errorFields}
          setCredentials={setCredentials}
          isValid={isValid}
          fields={fields}
        />

        {warnElement}
      </section>
    </main>
  );
}

export default LogIn;