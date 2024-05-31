import { Button, Checkbox, Form, FormInstance, Input, Space, Typography } from 'antd';
import { FC } from 'react';
import { CommonField } from '../types';
import { requiredEntryRule } from '../constants';

interface CheckboxFormProps {
  form: FormInstance<CommonField>;
  onFormFinish: (values: CommonField) => void;
}

const fieldNames: Record<keyof CommonField, string> = {
  name: 'name',
  label: 'label',
  required: 'required',
};

export const CheckboxForm: FC<CheckboxFormProps> = ({ form, onFormFinish }) => {
  return (
    <Space direction='vertical'>
      <Typography.Title level={5}>Добавить чекбокс</Typography.Title>
      <Form form={form} onFinish={onFormFinish}>
        <Form.Item label='Имя' name={fieldNames.name} rules={requiredEntryRule}>
          <Input size='small' placeholder='Введите имя' />
        </Form.Item>
        <Form.Item label='Лейбл' name={fieldNames.label} rules={requiredEntryRule}>
          <Input size='small' placeholder='Введите лейбл' />
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
