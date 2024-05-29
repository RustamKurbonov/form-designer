import { FC } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface EditorProps {
  code: string;
}

export const Editor: FC<EditorProps> = ({ code }) => {
  return (
    <SyntaxHighlighter language='react' style={docco}>
      {`${code}
</ form>`}
    </SyntaxHighlighter>
  );
};
