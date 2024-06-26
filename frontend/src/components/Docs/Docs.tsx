import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';
import Instruction from './Instruction';
import RequireList from './RequireList';
import Response from './Response';
import './styles/docs.css';

function Docs() {
  const bookSectionRef = useRef<HTMLElement>(null);
  const userSectionRef = useRef<HTMLElement>(null);
  const authSectionRef = useRef<HTMLElement>(null);

  const scrolOnClickHandler = (ref: React.MutableRefObject<HTMLElement | null>) => {
    ref.current!.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main id="docs-main">
      <section id="docs-menu-section">
        <Heading as="h2" id="api-documentation-heading" className="doc-heading" size="md" fontWeight="semibold">
          mynotesapp API Documentation
        </Heading>
        
        <ul id="services-section-list">
          <Heading as="h3" size="md" fontWeight="semibold" py="3px">Services</Heading>
          <li><Link to="#book-section" onClick={() => scrolOnClickHandler(bookSectionRef)}>Book</Link></li>
          <li><Link to="#user-section" onClick={() => scrolOnClickHandler(userSectionRef)}>User</Link></li>
          <li><Link to="#auth-section" onClick={() => scrolOnClickHandler(authSectionRef)}>Auth</Link></li>
        </ul>
      </section>

      <section ref={bookSectionRef} id="book-section">
        <Heading as="h4" size="md" fontWeight="semibold">Book</Heading>

        <Heading as="h5" size="sm" fontWeight="semibold" className="crud-heading">Create</Heading>
        <Instruction
          crud='POST'
          endpoint='/api/v1/books'
        />
        <RequireList
          listItems={['Authorization header', 'Book title']}
          footNotes={['The book\'s {author} and {about} informations are optional.']}
        />
        <Response
          status='successfully'
          code='201'
          body={`
{
  "id": ObjectId(), 
  "title": "Book Title"
}
          `}
        />

        <Heading as="h5" size="sm" fontWeight="semibold" className="crud-heading">Read</Heading>
        <Instruction
          crud='GET'
          endpoint='/api/v1/books'
        />
        <RequireList
          listItems={['Authorization header']}
        />
        <Response
          status='successfully'
          code='200'
          body={`
[
  {
    "id": ObjectId(),
    "user_id": ObjectId(),
    "title": "Book Title",
    "author": null,
    "about": "about this book",
    "section": null,
    "created_at": "2023-11-15T19:49:29.536Z"
  }
]
          `}
        />

        <Heading as="h5" size="sm" fontWeight="semibold" className="crud-heading">Update</Heading>

        <Heading as="h6" size="xs" fontWeight="semibold" className="crud-heading">Book information</Heading>
        <Instruction
          crud='PUT'
          endpoint='/api/v1/books/{id}/info'
        />
        <RequireList
          listItems={['Authorization header', 'Book {title}, {author} and {about}']}
          footNotes={[
            'If any of the fields are {undefined} it throws an {400 error}.',
            'If any of the fields are {null} it updates to {null}.'
          ]}
        />
        <Response
          status='successfully'
          code='204'
        />
        
        <Heading as="h6" size="xs" fontWeight="semibold" className="crud-heading">Book Section</Heading>
        <Instruction
          crud='PUT'
          endpoint='/api/v1/books/{id}/section'
        />
        <RequireList
          listItems={['Authorization header', 'Book {section}']}
          footNotes={[
            'If section is {undefined} it throws an {400 error}',
            'If section is {null} it updates to {null}'
          ]}
        />
        <Response
          status='successfully'
          code='204'
        />

        <Heading as="h5" size="sm" fontWeight="semibold" className="crud-heading">Delete</Heading>
        <Instruction
          crud='DELETE'
          endpoint='/api/v1/books/{id}'
        />
        <RequireList
          listItems={['Authorization header']}
        />
        <Response
          status='successfully'
          code='204'
        />
      </section>
      
      <section ref={userSectionRef} id="user-section">
        <Heading as="h4" size="md" fontWeight="semibold">User</Heading>

        <Heading as="h5" size="sm" fontWeight="semibold" className="crud-heading">Read</Heading>
        <Instruction
          crud='GET'
          endpoint='/api/v1/users'
        />
        <RequireList
          listItems={['Authorization header']}
        />
        <Response
          status='successfully'
          code='200'
          body={`
{
  "name": "user name",
  "email": "user email"
}
          `}
        />

        <Heading as="h5" size="sm" fontWeight="semibold" className="crud-heading">Update</Heading>

        <Heading as="h6" size="xs" fontWeight="semibold" className="crud-heading">Update email</Heading>
        <Instruction
          crud='PUT'
          endpoint='/api/v1/users/email'
        />
        <RequireList
          listItems={['Authorization header', 'New email']}
        />
        <Response
          status='successfully'
          code='204'
          responseNotes={['The access_token cookie is sent in the response headers with a JWT.']}
        />

        <Heading as="h6" size="xs" fontWeight="semibold" className="crud-heading">Update password</Heading>
        <Instruction
          crud='PUT'
          endpoint='/api/v1/users/password'
        />
        <RequireList
          listItems={['Authorization header', 'New password']}
        />
        <Response
          status='successfully'
          code='204'
        />

        <Heading as="h5" size="sm" fontWeight="semibold" className="crud-heading">Delete</Heading>
        <Instruction
          crud='DELETE'
          endpoint='/api/v1/users'
        />
        <RequireList
          listItems={['Authorization header']}
        />
        <Response
          status='successfully'
          code='204'
        />
      </section>

      <section ref={authSectionRef} id="auth-section">
        <Heading as="h4" size="md" fontWeight="semibold">Auth</Heading>
        <Heading as="h5" size="sm" fontWeight="semibold" className="crud-heading">Create</Heading>

        <Heading as="h6" size="xs" fontWeight="semibold" className="crud-heading">Register</Heading>
        <Instruction
          crud='POST'
          endpoint='/api/v1/auth/register'
        />
        <RequireList
          listItems={['User name, email, and password']}
        />
        <Response
          status='successfully'
          code='201'
          body={`
{
  email: "user@email",
  name: "User name",
}
          `}
          responseNotes={['The access_token cookie is sent in the response headers with a JWT.']}
        />

        <Heading as="h5" size="sm" fontWeight="semibold" className="crud-heading">Read</Heading>

        <Heading as="h6" size="xs" fontWeight="semibold" className="crud-heading">Login</Heading>
        <Instruction
          crud='POST'
          endpoint='/api/v1/auth/login'
        />
        <RequireList
          listItems={['User email and password']}
        />
        <Response
          status='successfully'
          code='201'
          responseNotes={['The access_token cookie is sent in the response headers with a JWT.']}
        />
      </section>
    </main>
  );
}

export default Docs;