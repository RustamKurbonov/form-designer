import { Button, Checkbox, Form, FormProps, Input, Space, Typography } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';
import { CommonSettings } from '../types';
import { requiredEntryRule } from '../constants';

interface CheckboxFormProps {
  onCode: Dispatch<SetStateAction<string>>;
}

const fieldNames: Record<keyof CommonSettings, string> = {
  name: 'name',
  label: 'label',
  required: 'required',
};

export const CheckboxForm: FC<CheckboxFormProps> = ({ onCode }) => {
  const [checkboxForm] = Form.useForm<CommonSettings>();

  const handleFormFinish: FormProps['onFinish'] = ({
    name,
    label,
    required,
  }: CommonSettings): void => {
    onCode(
      (prev) => `${prev} 
	<label>${label}</label> 
	<input type="checkbox" name="${name}" ${required ? 'required' : ''} />
	`
    );

    checkboxForm.resetFields();
  };

  return (
    <Space direction='vertical'>
      <Typography.Title level={5}>Добавить чекбокс</Typography.Title>
      <Form form={checkboxForm} onFinish={handleFormFinish}>
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
