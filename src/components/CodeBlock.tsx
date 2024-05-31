import { Button, Col, Row, Tooltip } from 'antd';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Code } from '../types';
import { copyToClipboard } from '../utils/copyToClipboard';
import { FormControls } from './FormControls';

interface CodeBlockProps {
  codes: Code[];
  onCode: Dispatch<SetStateAction<Code[]>>;
}

export const CodeBlock: FC<CodeBlockProps> = ({ codes, onCode }) => {
  const [messageAfterCopy, setMessageAfterCopy] = useState<string>('');

  const copyToClipboardTimeoutRef = useRef<number>();

  const formattedCode = `<form>\n${codes.map(({ data }) => data).join('\n')}\n</form>`;

  const handleCopyButtonClick = (): void => {
    copyToClipboard(formattedCode.toString())
      .then(() => {
        setMessageAfterCopy('Текст скопирован');
        clearTimeout(copyToClipboardTimeoutRef.current);
      })
      .catch((): void => {
        setMessageAfterCopy('Не удалось скопировать');
        clearTimeout(copyToClipboardTimeoutRef.current);
      })
      .finally(() => {
        copyToClipboardTimeoutRef.current = setTimeout((): void => {
          setMessageAfterCopy('');
        }, 3000);
      });
  };

  console.log(codes, 'code');

  const handleCodeReset = (): void => onCode([]);

  useEffect(() => {
    return () => clearTimeout(copyToClipboardTimeoutRef.current);
  }, []);

  return (
    <Row gutter={[0, 12]}>
      <FormControls codes={codes} onCode={onCode} />
      <Col span={24}>
        <SyntaxHighlighter language='react' style={docco}>
          {formattedCode.toString()}
        </SyntaxHighlighter>
      </Col>
      <Col span={24}>
        <Row justify='end'>
          <Tooltip placement='top' title={messageAfterCopy} open={Boolean(messageAfterCopy)}>
            <Button
              type='link'
              icon={<CopyOutlined />}
              onClick={handleCopyButtonClick}
              disabled={!codes.length}
            >
              Скопировать
            </Button>
          </Tooltip>
          <Button
            type='link'
            icon={<DeleteOutlined />}
            onClick={handleCodeReset}
            disabled={!codes.length}
          >
            Очистить
          </Button>
        </Row>
      </Col>
    </Row>
  );
};
