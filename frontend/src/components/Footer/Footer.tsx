import './styles/footer.css';

type FooterProps = {
  location: string;
}

function Footer({ location }: FooterProps) {
  const isPublicRoute = ![
    '/',
    '/settings'
  ].includes(location);

  return (
    isPublicRoute &&
    <footer>
      <p title="by jvitoralb">Created by jvitoralb</p>
    </footer>
  );
}

export default Footer;