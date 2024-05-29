import { useState } from 'react';
import { AdditionForm, Editor } from './components';
import { Row, Col } from 'antd';

const App = () => {
  const [code, setCode] = useState('<form>');

  return (
    <Row>
      <Col span={24}>
        <Editor code={code} />
      </Col>
      <Col span={24}>
        <AdditionForm onCode={setCode} />
      </Col>
    </Row>
  );
};

export default App;
