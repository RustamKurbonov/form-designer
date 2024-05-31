import { Col, Tag, Typography } from 'antd';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Code } from '../types';
import { EditingForm } from './EditingForm';

interface FormControlsProps {
  codes: Code[];
  onCode: Dispatch<SetStateAction<Code[]>>;
}

export const FormControls: FC<FormControlsProps> = ({ codes, onCode }) => {
  const [codeForEditing, setCodeForEditing] = useState<Code>();

  const handleModalClose = (): void => setCodeForEditing(undefined);

  const handleDeleteSetting = (id: string): void => {
    onCode((prev) => prev.filter((setting) => setting.id !== id));
  };

  return (
    <>
      <Col span={24}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Форма
        </Typography.Title>
      </Col>
      {codes.length > 0 && (
        <Col span={24}>
          <Typography.Title level={5} style={{ marginTop: 0 }}>
            Список полей
          </Typography.Title>
          {codes.map((code) => (
            <Tag
              closeIcon
              onClose={() => handleDeleteSetting(code.id)}
              key={code.id}
              onClick={() => setCodeForEditing(code)}
              style={{ cursor: 'pointer' }}
            >
              {code.data.name}
            </Tag>
          ))}
        </Col>
      )}
      {codeForEditing && (
        <EditingForm code={codeForEditing} onClose={handleModalClose} onCode={onCode} />
      )}
    </>
  );
};
