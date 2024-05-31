import { Button, Checkbox, Form, FormProps, Input, Select, Space, Typography } from 'antd';
import { FC, useEffect } from 'react';
import { InputField, FormFragment, FragmentTypes } from '../types';
import { requiredEntryRule } from '../constants';
import { v4 as uuidv4 } from 'uuid';

interface InputFormProps {
  initValue?: FormFragment;
  onFormFinish: (values: FormFragment) => void;
}

const fieldNames: Record<keyof InputField, string> = {
  name: 'name',
  label: 'label',
  required: 'required',
  type: 'type',
  placeholder: 'placeholder',
};

const inputTypes: string[] = ['text', 'email', 'phone', 'number'];

export const InputForm: FC<InputFormProps> = ({ initValue, onFormFinish }) => {
  const [inputForm] = Form.useForm<InputField>();

  const handleFormFinish: FormProps['onFinish'] = ({
    label,
    name,
    placeholder,
    required,
    type,
  }: InputField): void => {
    onFormFinish({
      type: FragmentTypes.Input,
      id: initValue?.id || uuidv4(),
      data: { name, label, required, placeholder, type },
    });

    inputForm.resetFields();
  };

  useEffect(() => {
    if (initValue) {
      const { data, type: codeType } = initValue;

      if (codeType === FragmentTypes.Input) {
        inputForm.setFieldsValue(data);
      }
    }
  }, [initValue]);

  return (
    <Space direction='vertical'>
      <Typography.Title level={5}>Добавить текстовое поле</Typography.Title>
      <Form form={inputForm} onFinish={handleFormFinish}>
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
          {initValue ? 'Изменить' : 'Добавить'}
        </Button>
      </Form>
    </Space>
  );
};
