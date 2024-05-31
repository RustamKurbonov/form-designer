import { AdditionForm, CodeBlock } from './components';
import { Row, Col, List, Typography } from 'antd';
import { CodeContextProvider } from './context/CodeContext';

const App = () => {
  return (
    <CodeContextProvider>
      <List style={{ padding: 20 }}>
        <Typography.Title style={{ marginTop: 0 }}>Конструктор форм</Typography.Title>
        <Row gutter={[60, 20]}>
          <Col flex='0 0 380px'>
            <AdditionForm />
          </Col>
          <Col flex='auto'>
            <CodeBlock />
          </Col>
        </Row>
      </List>
    </CodeContextProvider>
  );
};

export default App;
