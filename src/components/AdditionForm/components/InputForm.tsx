import { Button, Checkbox, Form, FormProps, Input, Select, Space, Typography } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';
import { InputSettings } from '../types';
import { requiredEntryRule } from '../constants';

interface InputFormProps {
  onCode: Dispatch<SetStateAction<string>>;
}

const fieldNames: Record<keyof InputSettings, string> = {
  name: 'name',
  label: 'label',
  required: 'required',
  type: 'type',
  placeholder: 'placeholder',
};

const inputTypes: string[] = ['text', 'email', 'phone', 'number'];

export const InputForm: FC<InputFormProps> = ({ onCode }) => {
  const [inputForm] = Form.useForm<InputSettings>();

  const handleFormFinish: FormProps['onFinish'] = ({
    name,
    label,
    required,
    placeholder,
    type,
  }: InputSettings): void => {
    onCode(
      (prev) => `${prev} 
      <label>${label}</label> 
      <input type="${type}" placeholder="${placeholder}" name="${name}" ${required ? 'required' : ''} />`
    );
    inputForm.resetFields();
  };

  return (
    <Space direction='vertical'>
      <Typography.Title level={5}>Добавить текстовое поле</Typography.Title>
      <Form form={inputForm} layout='inline' onFinish={handleFormFinish}>
        <Form.Item label='Имя' name={fieldNames.name} rules={requiredEntryRule}>
          <Input size='small' placeholder='Введите имя' />
        </Form.Item>
        <Form.Item label='Лейбл' name={fieldNames.label} rules={requiredEntryRule}>
          <Input size='small' placeholder='Введите лейбл' />
        </Form.Item>
        <Form.Item label='Подсказка' name={fieldNames.placeholder}>
          <Input size='small' placeholder='Введите подсказку' />
        </Form.Item>
        <Form.Item label='Тип' name={fieldNames.type}>
          <Select
            size='small'
            options={inputTypes.map((type) => ({ value: type, label: type }))}
            style={{ width: 140 }}
            placeholder='Выберите тип'
          />
        </Form.Item>
        <Form.Item label='Обязательный' name={fieldNames.required} valuePropName='checked'>
          <Checkbox />
        </Form.Item>
        <Button type='primary' htmlType='submit' size='small'>
          Добавить
        </Button>
      </Form>
    </Space>
  );
};
