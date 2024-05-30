export type CodeTypes = 'input' | 'select' | 'checkbox';

export interface CommonSettings {
  name: string;
  label: string;
  required: boolean;
}

export interface InputSettings extends CommonSettings {
  type: string;
  placeholder: string;
}

export interface SelectSettings extends CommonSettings {
  options: { name: string; value: string }[];
}

export interface Code {
  id: string;
  data: string;
  name: string;
  type: CodeTypes;
}
