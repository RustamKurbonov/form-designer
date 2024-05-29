import { Button, Checkbox, Form, FormProps, Input, Space, Typography } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';
import { SelectSettings } from '../types';
import { requiredEntryRule } from '../constants';
import { CloseOutlined } from '@ant-design/icons';

interface InputFormProps {
  onCode: Dispatch<SetStateAction<string>>;
}

const fieldNames: Record<keyof SelectSettings, string> = {
  name: 'name',
  label: 'label',
  required: 'required',
  options: 'options',
};

export const SelectForm: FC<InputFormProps> = ({ onCode }) => {
  const [selectForm] = Form.useForm<SelectSettings>();

  const handleFormFinish: FormProps['onFinish'] = ({
    name,
    label,
    required,
    options,
  }: SelectSettings): void => {
    onCode(
      (prev) => `${prev} 
      <label>${label}</label> 
      <select name="${name}" ${required ? 'required' : ''}>
      ${options
        .map((option) => {
          return `<option value="${option.value}">${option.name}</option>`;
        })
        .join(' ')}
      </select>`
    );

    selectForm.resetFields();
  };

  return (
    <Space direction='vertical'>
      <Typography.Title level={5}>Добавить список</Typography.Title>
      <Form form={selectForm} layout='inline' onFinish={handleFormFinish}>
        <Form.Item label='Имя' name={fieldNames.name} rules={requiredEntryRule}>
          <Input size='small' placeholder='Введите имя' />
        </Form.Item>
        <Form.Item label='Лейбл' name={fieldNames.label} rules={requiredEntryRule}>
          <Input size='small' placeholder='Введите лейбл' />
        </Form.Item>
        <Form.Item label='Список значений' rules={requiredEntryRule}>
          <Form.List name={[fieldNames.options]}>
            {(subFields, subOpt) => (
              <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                {subFields.map((subField) => (
                  <Space key={subField.key}>
                    <Form.Item noStyle name={[subField.name, 'name']}>
                      <Input placeholder='Имя' size='small' />
                    </Form.Item>
                    <Form.Item noStyle name={[subField.name, 'value']}>
                      <Input placeholder='Значение' size='small' />
                    </Form.Item>
                    <CloseOutlined
                      onClick={() => {
                        subOpt.remove(subField.name);
                      }}
                    />
                  </Space>
                ))}
                <Button type='dashed' onClick={() => subOpt.add()} block size='small'>
                  + Добавить значение
                </Button>
              </div>
            )}
          </Form.List>
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
