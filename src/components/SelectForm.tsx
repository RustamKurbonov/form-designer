import { Button, Checkbox, Form, FormProps, Input, Space, Typography } from 'antd';
import { FC, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { FormFragment, FragmentTypes, SelectField } from '../types';
import { requiredEntryRule } from '../constants';
import { v4 as uuidv4 } from 'uuid';

interface SelectFormProps {
  initValue?: FormFragment;
  onFormFinish: (values: FormFragment) => void;
}

const fieldNames: Record<keyof SelectField, string> = {
  name: 'name',
  label: 'label',
  required: 'required',
  options: 'options',
};

export const SelectForm: FC<SelectFormProps> = ({ initValue, onFormFinish }) => {
  const [selectForm] = Form.useForm<SelectField>();

  const handleFormFinish: FormProps['onFinish'] = ({
    label,
    name,
    required,
    options,
  }: SelectField): void => {
    onFormFinish({
      type: FragmentTypes.Select,
      id: initValue?.id || uuidv4(),
      data: { name, label, required, options },
    });

    selectForm.resetFields();
  };

  useEffect(() => {
    if (initValue) {
      const { data, type: codeType } = initValue;

      if (codeType === FragmentTypes.Select) {
        selectForm.setFieldsValue(data);
      }
    }
  }, [initValue]);

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Typography.Title level={5}>Добавить список</Typography.Title>
      <Form form={selectForm} onFinish={handleFormFinish}>
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
          {initValue ? 'Изменить' : 'Добавить'}
        </Button>
      </Form>
    </Space>
  );
};
