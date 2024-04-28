import { Link } from 'react-router-dom';
import { Heading, Flex, Text } from '@chakra-ui/react';
import useWelcome from './hooks/useWelcome';
import './styles/welcome.css';

function Welcome() {
  const {
    welcomeHeadingRef,
    linksContainerRef,
    aboutSectionRef,
    aboutSectionScrollLink,
  } = useWelcome();

  return (
    <main>
      <section id="welcome-section">
        <Heading
          ref={welcomeHeadingRef} as="h2" id="welcome-heading"
          fontWeight="semibold" className="display-effect-starter"
        >
          Welcome to mynotesapp!
        </Heading>

        <Flex
          ref={linksContainerRef} id="info-links-container" width="90vw" paddingTop="40px"
          justifyContent="space-evenly" className="display-effect-starter"
        >
          <Text>
            <Link to="#about-section" onClick={aboutSectionScrollLink}>
              About
            </Link>
          </Text>
          <Text>
            <Link to="/docs">Documentation</Link>
          </Text>
        </Flex>
      </section>

      <section ref={aboutSectionRef} id="about-section">
        <Heading id="about-heading" as="h2" fontWeight="semibold">
          About
        </Heading>

        <Text>
          A Full Stack MERN application built with TypeScript, following a Test-Driven Development approach. 
          The main challenge was implementing the use of JSON Web Tokens with REST APIs to handle user data securely.
        </Text>
        <Text>
          Access the <Link 
            to="https://github.com/jvitoralb/my-books-app" 
            referrerPolicy="no-referrer" className="welcome-links"
          >
            repository
          </Link> on GitHub.
        </Text>
        <Text>
          For more information visit the <Link 
            to="/docs" className="welcome-links"
          >
            documentation
          </Link>.
        </Text>

        <article id="frontend-article" className="article">
          <Heading as="h3" size="lg">Frontend</Heading>
          <Text>
            In terms of a MERN stack, the frontend was built with React along with some libraries, such as 
            React Router, for manipulating routes, Chakra, for interface development, and Axios, to handle 
            server communication.
          </Text>
        </article>

        <article id="backend-article" className="article">
          <Heading as="h3" size="lg">Backend</Heading>
          <Text>
            The Backend was built with Node and Express and followed the REST style for API development, 
            and the use of JSON Web Tokens to handle user authentication.
            <br />
            For data persistence, in a MERN application, the database of choice is MongoDB, and for data 
            manipulation, we used the Prisma library.
          </Text>

          <Heading as="h3" size="md">Testes</Heading>
          <Text>
            Tests were used in the application's backend, using the Jest library and following a Test-Driven Development approach.
          </Text>
        </article>
      </section>
    </main>
  );
}

export default Welcome;