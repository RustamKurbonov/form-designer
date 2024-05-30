import { useState } from 'react';
import { AdditionForm, Editor } from './components';
import { Row, Col, List, Typography } from 'antd';
import { Code } from './types';

const App = () => {
  const [code, setCode] = useState<Code[]>([]);

  const handleCodeReset = (): void => {
    setCode([]);
  };

  console.log(code, 'code');

  return (
    <List style={{ padding: 20 }}>
      <Typography.Title style={{ marginTop: 0 }}>Конструктор форм</Typography.Title>
      <Row gutter={[60, 20]}>
        <Col flex='0 0 380px'>
          <AdditionForm onCode={setCode} />
        </Col>
        <Col flex='auto'>
          <Editor code={code} onFormReset={handleCodeReset} />
        </Col>
      </Row>
    </List>
  );
};

export default App;
