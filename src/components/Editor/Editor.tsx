import { Button, Col, Row, Tooltip } from 'antd';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { FC, useEffect, useRef, useState } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { copyToClipboard } from '../../utils/copyToClipboard';

interface EditorProps {
  code: string;
  onFormReset: () => void;
}

<form></form>;

export const Editor: FC<EditorProps> = ({ code, onFormReset }) => {
  const [messageAfterCopy, setMessageAfterCopy] = useState<string>('');

  const copyToClipboardTimeoutRef = useRef<number>();

  const allCode = `${code}
  </ form>`;

  const handleCopyButtonClick = (): void => {
    copyToClipboard(allCode)
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
            <Button type='link' icon={<CopyOutlined />} onClick={handleCopyButtonClick}>
              Скопировать
            </Button>
          </Tooltip>
          <Button type='link' icon={<DeleteOutlined />} onClick={onFormReset}>
            Очистить
          </Button>
        </Row>
      </Col>
      <Col span={24}>
        <SyntaxHighlighter language='react' style={docco}>
          {allCode}
        </SyntaxHighlighter>
      </Col>
    </Row>
  );
};
