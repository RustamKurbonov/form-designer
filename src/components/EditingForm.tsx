import { Modal } from 'antd';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { Code, CodeTypes } from '../types';
import { InputForm } from './InputForm';
import { CheckboxForm } from './CheckboxForm';
import { SelectForm } from './SelectForm';

interface EditingFormProps {
  code: Code;
  onClose: () => void;
  onCode: Dispatch<SetStateAction<Code[]>>;
}

export const EditingForm: FC<EditingFormProps> = ({ code, onClose, onCode }) => {
  const handleFormFinish = (code: Code): void => {
    onCode((prev) => [...prev.filter(({ id }) => id !== code.id), code]);
    onClose();
  };

  const forms: Record<CodeTypes, ReactNode> = {
    input: <InputForm onFormFinish={handleFormFinish} initValue={code} />,
    select: <SelectForm onFormFinish={handleFormFinish} initValue={code} />,
    checkbox: <CheckboxForm onFormFinish={handleFormFinish} initValue={code} />,
  };

  return (
    <Modal
      open
      title={`Редактирование поля ${code.data.name}`}
      onCancel={() => onClose()}
      footer={false}
    >
      {forms?.[code.type]}
    </Modal>
  );
};
