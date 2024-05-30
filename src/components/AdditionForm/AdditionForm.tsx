import { Row, Col } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';
import { CheckboxForm, InputForm, SelectForm } from './components';
import { Code } from '../../types';

interface AdditionFormProps {
  onCode: Dispatch<SetStateAction<Code[]>>;
}

export const AdditionForm: FC<AdditionFormProps> = ({ onCode }) => {
  return (
    <Row justify='space-between' align='top'>
      <Col span={24}>
        <InputForm onCode={onCode} />
      </Col>
      <Col span={24}>
        <SelectForm onCode={onCode} />
      </Col>
      <Col span={24}>
        <CheckboxForm onCode={onCode} />
      </Col>
    </Row>
  );
};
