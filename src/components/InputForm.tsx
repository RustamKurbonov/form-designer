import { Button, Checkbox, Form, FormInstance, Input, Select, Space, Typography } from 'antd';
import { FC } from 'react';
import { InputField } from '../types';
import { requiredEntryRule } from '../constants';

interface InputFormProps {
  form: FormInstance<InputField>;
  onFormFinish: (values: InputField) => void;
}

const fieldNames: Record<keyof InputField, string> = {
  name: 'name',
  label: 'label',
  required: 'required',
  type: 'type',
  placeholder: 'placeholder',
};

const inputTypes: string[] = ['text', 'email', 'phone', 'number'];

export const InputForm: FC<InputFormProps> = ({ form, onFormFinish }) => {
  return (
    <Space direction='vertical'>
      <Typography.Title level={5}>Добавить текстовое поле</Typography.Title>
      <Form form={form} onFinish={onFormFinish}>
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
