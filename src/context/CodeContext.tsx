import { ReactElement, createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { FormFragment } from '../types';

interface CodeContextInterface {
  formFragments: FormFragment[];
  onFormFragment: Dispatch<SetStateAction<FormFragment[]>>;
}

export const CodeContext = createContext<CodeContextInterface | null>(null);

export const CodeContextProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [formFragments, setFormFragments] = useState<FormFragment[]>([]);

  const value: CodeContextInterface = {
    formFragments,
    onFormFragment: setFormFragments,
  };

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
};
