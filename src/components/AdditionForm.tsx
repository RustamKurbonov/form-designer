import { Row, Col, Form, FormProps } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';
import { Code, CodeTypes, CommonField, InputField, SelectField } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { InputForm } from './InputForm';
import { SelectForm } from './SelectForm';
import { CheckboxForm } from './CheckboxForm';

interface AdditionFormProps {
  onCode: Dispatch<SetStateAction<Code[]>>;
}

export const AdditionForm: FC<AdditionFormProps> = ({ onCode }) => {
  const [checkboxForm] = Form.useForm<CommonField>();
  const [selectForm] = Form.useForm<SelectField>();
  const [inputForm] = Form.useForm<InputField>();

  const handleInputFormFinish: FormProps['onFinish'] = ({
    name,
    label,
    required,
    placeholder,
    type,
  }: InputField): void => {
    onCode((prev) => [
      ...prev,
      {
        type: CodeTypes.Input,
        id: uuidv4(),
        data: { name, label, required, placeholder, type },
      },
    ]);
    inputForm.resetFields();
  };

  const handleSelectFormFinish: FormProps['onFinish'] = ({
    name,
    label,
    required,
    options = [],
  }: SelectField): void => {
    onCode((prev) => [
      ...prev,
      { id: uuidv4(), type: CodeTypes.Select, data: { name, label, required, options } },
    ]);

    selectForm.resetFields();
  };

  const handleCheckboxFormFinish: FormProps['onFinish'] = ({
    name,
    label,
    required,
  }: CommonField): void => {
    onCode((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: CodeTypes.Checkbox,
        data: { label, required, name },
      },
    ]);

    checkboxForm.resetFields();
  };

  return (
    <Row justify='space-between' align='top'>
      <Col span={24}>
        <InputForm form={inputForm} onFormFinish={handleInputFormFinish} />
      </Col>
      <Col span={24}>
        <SelectForm form={selectForm} onFormFinish={handleSelectFormFinish} />
      </Col>
      <Col span={24}>
        <CheckboxForm form={checkboxForm} onFormFinish={handleCheckboxFormFinish} />
      </Col>
    </Row>
  );
};
