import { Col, Modal, Row } from 'antd';
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

  const handleFormFinish = (fragment: FormFragment): void => {
    const test = codeContext?.formFragments.map((data) => {
      if (fragment.id === data.id) {
        return fragment;
      }
      return data;
    });

    codeContext?.onFormFragment(test || []);
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
      <Row justify='space-between' align='top'>
        <Col span={24}>{forms?.[code.type]}</Col>
      </Row>
    </Modal>
  );
};
