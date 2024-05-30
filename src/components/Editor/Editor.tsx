import { Button, Col, Row, Tooltip } from 'antd';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { FC, useEffect, useRef, useState } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { Code } from '../../types';

interface EditorProps {
  code: Code[];
  onFormReset: () => void;
}

export const Editor: FC<EditorProps> = ({ code, onFormReset }) => {
  const [messageAfterCopy, setMessageAfterCopy] = useState<string>('');

  const copyToClipboardTimeoutRef = useRef<number>();

  const formattedCode = `<form>\n${code.map(({ data }) => data).join('\n')}\n</form>`;

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

  useEffect(() => {
    return () => clearTimeout(copyToClipboardTimeoutRef.current);
  }, []);

  return (
    <Row gutter={[0, 12]}>
      <Col span={24}>
        <Row justify='end'>
          <Tooltip placement='top' title={messageAfterCopy} open={Boolean(messageAfterCopy)}>
            <Button
              type='link'
              icon={<CopyOutlined />}
              onClick={handleCopyButtonClick}
              disabled={!code.length}
            >
              Скопировать
            </Button>
          </Tooltip>
          <Button
            type='link'
            icon={<DeleteOutlined />}
            onClick={onFormReset}
            disabled={!code.length}
          >
            Очистить
          </Button>
        </Row>
      </Col>
      <Col span={24}>
        <SyntaxHighlighter language='react' style={docco}>
          {formattedCode.toString()}
        </SyntaxHighlighter>
      </Col>
    </Row>
  );
};
