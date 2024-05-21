import { Code, Text } from '@chakra-ui/react';

type ResponseProps = {
  status: string;
  code: string;
  body?: string;
  responseNotes?: string[];
}

function Response({ status, code, body, responseNotes }: ResponseProps) {
  return (
    <section className="response-container">
      {
        !body ? 
        <Text className="crud-response-text">
          Server should answer {status} a status code <span className="docs-highlight">{code}</span>.
        </Text> :
        <>
          <Text className="crud-response-text">
            Server should answer {status} a status code <span className="docs-highlight">{code}</span> and a response body equals to:
          </Text>
          <div className="code-block-container">
            <Code p="6px" whiteSpace="break-spaces">{body}</Code>
          </div>
        </>
      }
      {
        responseNotes && responseNotes.map((note, idx) => (
          <Text key={`${idx}${note}`} className="note-text">
            Note: {note}
          </Text>
        ))
      }
    </section>
  );
}

export default Response;