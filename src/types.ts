export enum FragmentTypes {
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

export interface Checkbox {
  type: FragmentTypes.Checkbox;
  data: CommonField;
}

export interface Input {
  type: FragmentTypes.Input;
  data: InputField;
}

export interface Select {
  type: FragmentTypes.Select;
  data: SelectField;
}

export type FormFragment = {
  id: string;
  type: FragmentTypes;
} & (Checkbox | Input | Select);
