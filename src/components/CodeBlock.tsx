import { Button, Col, Row, Tooltip } from 'antd';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { FC, useContext, useEffect, useRef, useState } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { copyToClipboard } from '../utils/copyToClipboard';
import { FormControls } from './FormControls';
import { CodeContext } from '../context/CodeContext';

export const CodeBlock: FC = () => {
  const [messageAfterCopy, setMessageAfterCopy] = useState<string>('');
  const copyToClipboardTimeoutRef = useRef<number>();
  const codeContext = useContext(CodeContext);

  const formFragments = codeContext?.formFragments;

  const formattedForm = `<form>\n${formFragments?.map(({ data }) => data).join('\n')}\n</form>`;

  const handleCopyButtonClick = (): void => {
    copyToClipboard(formattedForm.toString())
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

  const handleCodeReset = (): void => codeContext?.onFormFragment([]);

  console.log(codeContext?.formFragments, 'formFragments');

  useEffect(() => {
    return () => clearTimeout(copyToClipboardTimeoutRef.current);
  }, []);

  return (
    <Row gutter={[0, 12]}>
      <FormControls />
      <Col span={24}>
        <SyntaxHighlighter language='react' style={docco}>
          {formattedForm.toString()}
        </SyntaxHighlighter>
      </Col>
      <Col span={24}>
        <Row justify='end'>
          <Tooltip placement='top' title={messageAfterCopy} open={Boolean(messageAfterCopy)}>
            <Button
              type='link'
              icon={<CopyOutlined />}
              onClick={handleCopyButtonClick}
              disabled={!formFragments?.length}
            >
              Скопировать
            </Button>
          </Tooltip>
          <Button
            type='link'
            icon={<DeleteOutlined />}
            onClick={handleCodeReset}
            disabled={!formFragments?.length}
          >
            Очистить
          </Button>
        </Row>
      </Col>
    </Row>
  );
};
