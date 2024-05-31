import { FormFragment, FragmentTypes } from '../types';

export const converterHtml = (fragments: FormFragment[]): string => {
  return `<form>\n${fragments
    .map((fragment) => {
      switch (fragment.type) {
        case FragmentTypes.Input:
          return `<label>${fragment.data.label}</label>\n<input placeholder="${fragment.data.placeholder || ''}" type="${fragment.data.type || ''}" name="${fragment.data.name}" ${fragment.data.required ? 'required' : ''} />\n`;

        case FragmentTypes.Select:
          return `<label>${fragment.data.label}</label>\n<select name="${fragment.data.name}" ${fragment.data.required ? 'required' : ''}>\n${fragment.data.options.map((option) => `<option value="${option.value}">${option.name}</option>`).join('\n')}\n</select>\n`;

        case FragmentTypes.Checkbox:
          return `<label>${fragment.data.label}</label>\n<input type="checkbox" name="${fragment.data.name}" ${fragment.data.required ? 'required' : ''} />\n`;
      }
    })
    .join(' ')}</form>`;
};
