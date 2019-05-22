import { useReducer } from 'react';

type UseInputsAction = {
  name: string;
  value: string;
};

type InitialValueForm = {
  [key: string]: string;
};

function reducer<T>(state: T, action: UseInputsAction) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useInputs(initialValue: InitialValueForm) {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };
  return [state, handleOnChange];
}
