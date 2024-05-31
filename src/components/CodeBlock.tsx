import { Button, Col, Row, Tag, Tooltip, Typography } from 'antd';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { FC, useEffect, useRef, useState } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Code } from '../types';
import { copyToClipboard } from '../utils/copyToClipboard';

interface CodeBlockProps {
  code: Code[];
  onFormReset: () => void;
  onDeleteSetting: (id: string) => void;
}

export const CodeBlock: FC<CodeBlockProps> = ({ code, onFormReset, onDeleteSetting }) => {
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
  console.log(code, 'code');

  useEffect(() => {
    return () => clearTimeout(copyToClipboardTimeoutRef.current);
  }, []);

  return (
    <Row gutter={[0, 12]}>
      <Col span={24}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Форма
        </Typography.Title>
      </Col>
      {code.length > 0 && (
        <Col span={24}>
          <Typography.Title level={5} style={{ marginTop: 0 }}>
            Список полей
          </Typography.Title>
          {code.map(({ id, data }) => (
            <Tag
              closeIcon
              onClose={() => onDeleteSetting(id)}
              key={id}
              onClick={() => console.log('tests')}
              style={{ cursor: 'pointer' }}
            >
              {data.name}
            </Tag>
          ))}
        </Col>
      )}
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
    </Row>
  );
};