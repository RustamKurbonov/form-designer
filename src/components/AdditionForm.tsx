import { Row, Col } from 'antd';
import { FC, useContext } from 'react';
import { FormFragment } from '../types';
import { InputForm } from './InputForm';
import { SelectForm } from './SelectForm';
import { CheckboxForm } from './CheckboxForm';
import { CodeContext } from '../context/CodeContext';

export const AdditionForm: FC = () => {
  const codeContext = useContext(CodeContext);

  const handleFormFinish = (code: FormFragment): void => {
    codeContext?.onFormFragment((prev) => [...prev, code]);
  };

  return (
    <Row justify='space-between' align='top'>
      <Col span={24}>
        <InputForm onFormFinish={handleFormFinish} />
      </Col>
      <Col span={24}>
        <SelectForm onFormFinish={handleFormFinish} />
      </Col>
      <Col span={24}>
        <CheckboxForm onFormFinish={handleFormFinish} />
      </Col>
    </Row>
  );
};
