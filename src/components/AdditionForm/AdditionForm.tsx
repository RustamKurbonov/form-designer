import { Space } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';
import { InputForm, SelectForm } from './components';

interface AdditionFormProps {
  onCode: Dispatch<SetStateAction<string>>;
}

export const AdditionForm: FC<AdditionFormProps> = ({ onCode }) => {
  return (
    <Space direction='vertical'>
      <InputForm onCode={onCode} />
      <SelectForm onCode={onCode} />
    </Space>
  );
};
