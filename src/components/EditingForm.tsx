import { Modal } from 'antd';
import { FC, ReactNode, useContext } from 'react';
import { InputForm } from './InputForm';
import { CheckboxForm } from './CheckboxForm';
import { SelectForm } from './SelectForm';
import { FormFragment, FragmentTypes } from '../types';
import { CodeContext } from '../context/CodeContext';

interface EditingFormProps {
  code: FormFragment;
  onClose: () => void;
}

export const EditingForm: FC<EditingFormProps> = ({ code, onClose }) => {
  const codeContext = useContext(CodeContext);

  const handleFormFinish = (code: FormFragment): void => {
    codeContext?.onFormFragment((prev) => [...prev.filter(({ id }) => id !== code.id), code]);
    onClose();
  };

  const forms: Record<FragmentTypes, ReactNode> = {
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
