import { Button, Checkbox, Form, FormInstance, Input, Space, Typography } from 'antd';
import { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { SelectField } from '../types';
import { requiredEntryRule } from '../constants';

interface InputFormProps {
  form: FormInstance<SelectField>;
  onFormFinish: (values: SelectField) => void;
}

const fieldNames: Record<keyof SelectField, string> = {
  name: 'name',
  label: 'label',
  required: 'required',
  options: 'options',
};

export const SelectForm: FC<InputFormProps> = ({ form, onFormFinish }) => {
  return (
    <Space direction='vertical'>
      <Typography.Title level={5}>Добавить список</Typography.Title>
      <Form form={form} onFinish={onFormFinish}>
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
