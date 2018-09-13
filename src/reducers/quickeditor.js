import { combineReducers } from "redux";
import {
  GET_QUICK_EDITOR_STATE,
  TOGGLE_QUICK_EDITOR,
  CLOSE_QUICK_EDITOR
} from "../constants/ActionTypes";

const InitialState = {
  isOpen: false,
  listId: "",
  cardId: "",
  cardTitle: "",
  top: "",
  left: ""
};

const QuickEditor = (state = InitialState, action) => {
  switch (action.type) {
    case GET_QUICK_EDITOR_STATE: {
      return state;
    }

    case TOGGLE_QUICK_EDITOR: {
      // const { listId, cardId, cardTitle } = action.payload;
      const newPayload = {
        isOpen: true,
        ...action.payload
      };

      return Object.assign({}, state.QuickEditor, newPayload);
    }

    case CLOSE_QUICK_EDITOR: {
      return {
        ...state,
        ...InitialState
      };
    }

    default:
      return state;
  }
};

export default combineReducers({ QuickEditor });
