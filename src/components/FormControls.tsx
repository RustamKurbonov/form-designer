import { Col, Tag, Typography } from 'antd';
import { FC, useContext, useState } from 'react';
import { EditingForm } from './EditingForm';
import { CodeContext } from '../context/CodeContext';
import { FormFragment } from '../types';

export const FormControls: FC = () => {
  const [codeForEditing, setCodeForEditing] = useState<FormFragment>();
  const codeContext = useContext(CodeContext);

  const formFragments = codeContext?.formFragments;

  const handleModalClose = (): void => setCodeForEditing(undefined);

  const handleDeleteSetting = (id: string): void => {
    codeContext?.onFormFragment((prev) => prev.filter((setting) => setting.id !== id));
  };

  return (
    <>
      <Col span={24}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Форма
        </Typography.Title>
      </Col>
      {Boolean(formFragments?.length) && (
        <Col span={24}>
          <Typography.Title level={5} style={{ marginTop: 0 }}>
            Список полей
          </Typography.Title>
          {formFragments?.map((fragment) => (
            <Tag
              closeIcon
              onClose={() => handleDeleteSetting(fragment.id)}
              key={fragment.id}
              onClick={() => setCodeForEditing(fragment)}
              style={{ cursor: 'pointer' }}
            >
              {fragment.data.name}
            </Tag>
          ))}
        </Col>
      )}
      {codeForEditing && <EditingForm code={codeForEditing} onClose={handleModalClose} />}
    </>
  );
};
