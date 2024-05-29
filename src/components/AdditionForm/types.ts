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
