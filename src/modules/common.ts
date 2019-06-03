// import
// import { Dispatch, Action } from 'redux';
// import { ThunkDispatch } from 'redux-thunk';
import produce from 'immer';

const SHOW_MODAL = 'common/SHOW_MODAL';

// action creator
interface ModalProps {
  isShow: boolean;
}
export const showModal = (payload: ModalProps) => ({
  type: SHOW_MODAL,
  payload,
});

// api actions

// initialState
export interface CommonState {
  isShow: boolean;
}
const initialState = {
  isShow: false,
};

// reducer
interface ModalAction {
  type: typeof SHOW_MODAL;
  payload: ModalProps;
}
export type CommonAction = ModalAction;
const reducer = (state = initialState, action: CommonAction) => {
  switch (action.type) {
    case SHOW_MODAL:
      return produce(state, draft => {
        draft.isShow = action.payload.isShow;
      });
    default:
      return state;
  }
};

// export reducer
export default reducer;
