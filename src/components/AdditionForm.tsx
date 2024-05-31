import { Row, Col } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';
import { Code } from '../types';
import { InputForm } from './InputForm';
import { SelectForm } from './SelectForm';
import { CheckboxForm } from './CheckboxForm';

interface AdditionFormProps {
  onCode: Dispatch<SetStateAction<Code[]>>;
}

export const AdditionForm: FC<AdditionFormProps> = ({ onCode }) => {
  const handleFormFinish = (code: Code): void => {
    onCode((prev) => [...prev, code]);
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
