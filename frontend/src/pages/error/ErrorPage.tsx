import { useRouteError } from 'react-router-dom';
import useErrorStats from './hooks/useErrorStats';
import Error from '../../components/Error';


function ErrorPage() {
  const error = useRouteError();
  const {
    statusCode,
    message,
  } = useErrorStats(error);

  return (
    <Error
      statusCode={statusCode}
      statusMessage={message}
    />
  );
}

export default ErrorPage;