import { Heading, Text } from '@chakra-ui/react';

type RequireListProps = {
  listItems: string[];
  footNotes?: string[];
}

function RequireList({ listItems, footNotes }: RequireListProps) {
  const addHighlightSpan = (str: string) => {
    let storage: (string | JSX.Element)[] = [];
    let currStr = '';
    let i = 0;
   
    while(i < str.length) {
      if (str.charAt(i) === '{') {
        let word = '';
        word = str.slice(i + 1, str.indexOf('}', i));
        storage.push(currStr, <span key={`note-span-${i}`} className="docs-highlight">{word}</span>);
        i = str.indexOf('}', i);
        currStr = '';
        i++;
        continue;
      }
      currStr += str.charAt(i);
      i++;
    }

    if (currStr !== '') {
      storage.push(currStr);
    }

    return storage;
  }

  return (
    <>
      <ol className="require-list">
        <Heading as="h5" size="sm" fontWeight="semibold">Requires:</Heading>
        {
          listItems.map((item, idx) => (
            <li key={`${idx}${item}`}>
              {item.includes('{') ? addHighlightSpan(item) : item}
            </li>
          ))
        }
      </ol>
      {
        footNotes && footNotes.map((note, idx) => (
          <Text key={`${idx}${note}`} className="note-text">
            Note: {note.includes('{') ? addHighlightSpan(note) : note}
          </Text>
        ))
      }
    </>
  );
}

export default RequireList;