import { Code, Text } from '@chakra-ui/react';

type ResponseProps = {
  status: string;
  code: string;
  body?: string;
}

function Response({ status, code, body }: ResponseProps) {
  return (
    !body ? 
    <Text className="crud-response-text" marginBottom="12px">
      Server should answer {status} a status code <span className="docs-highlight">{code}</span>.
    </Text> 
    : 
    <>
      <Text className="crud-response-text">
        Server should answer {status} a status code <span className="docs-highlight">{code}</span> and a response body equals to:
      </Text>
      <div className="code-block-container">
        <Code p="6px" marginBottom="12px" whiteSpace="break-spaces">
          {
            body
          }
        </Code>
      </div>
    </>
  );
}

export default Response;