import { Button, Checkbox, Form, FormProps, Input, Space, Typography } from 'antd';
import { FC, useEffect } from 'react';
import { Code, CodeTypes, CommonField } from '../types';
import { requiredEntryRule } from '../constants';
import { v4 as uuidv4 } from 'uuid';

interface CheckboxFormProps {
  initValue?: Code;
  onFormFinish: (values: Code) => void;
}

const fieldNames: Record<keyof CommonField, string> = {
  name: 'name',
  label: 'label',
  required: 'required',
};

export const CheckboxForm: FC<CheckboxFormProps> = ({ initValue, onFormFinish }) => {
  const [checkboxForm] = Form.useForm<CommonField>();

  const handleFormFinish: FormProps['onFinish'] = ({
    label,
    name,
    required,
  }: CommonField): void => {
    onFormFinish({
      type: CodeTypes.Checkbox,
      id: initValue?.id || uuidv4(),
      data: { name, label, required },
    });

    checkboxForm.resetFields();
  };

  useEffect(() => {
    if (initValue) {
      const { data, type: codeType } = initValue;

      if (codeType === CodeTypes.Checkbox) {
        checkboxForm.setFieldsValue(data);
      }
    }
  }, [initValue]);

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
          {initValue ? 'Изменить' : 'Добавить'}
        </Button>
      </Form>
    </Space>
  );
};
