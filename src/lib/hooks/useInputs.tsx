import { useReducer } from 'react';

type UseInputsAction = {
  name: string;
  value: string;
};

type InitialValueForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

function reducer<T>(state: T, action: UseInputsAction) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useInputs(initialValue: InitialValueForm) {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };
  return [state, onChange];
}
