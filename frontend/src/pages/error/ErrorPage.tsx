import { useRouteError } from 'react-router-dom';
import useErrorStats from './hooks/useErrorStats';


function ErrorPage() {
  const error = useRouteError();
  const {
    statusCode,
    message,
  } = useErrorStats(error);

  return (
    <p>{statusCode} - {message}</p>
  );
}

export default ErrorPage;