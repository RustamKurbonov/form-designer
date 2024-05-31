export enum CodeTypes {
  Input = 'input',
  Select = 'select',
  Checkbox = 'checkbox',
}

export interface CommonField {
  name: string;
  label: string;
  required: boolean;
}

export interface InputField extends CommonField {
  type: string;
  placeholder: string;
}

export interface SelectField extends CommonField {
  options: { name: string; value: string }[];
}

export interface CheckboxCode {
  type: CodeTypes.Checkbox;
  data: CommonField;
}

export interface InputCode {
  type: CodeTypes.Input;
  data: InputField;
}

export interface SelectCode {
  type: CodeTypes.Select;
  data: SelectField;
}

export type Code = {
  id: string;
  type: CodeTypes;
} & (CheckboxCode | InputCode | SelectCode);
