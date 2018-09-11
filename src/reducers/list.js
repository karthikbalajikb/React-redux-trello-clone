import { combineReducers } from "redux";
import {
  FETCH_ALL_LISTS,
  ADD_NEW_LIST,
  ADD_NEW_CARD_TO_LIST,
  DELETE_CARD_FROM_LIST
} from "../constants/ActionTypes";

const InitialState = {
  Loading: true,
  List: []
};
const List = (state = InitialState, action) => {
  switch (action.type) {
    case FETCH_ALL_LISTS: {
      return {
        ...state,
        Loading: false,
        List: action.lists
      };
    }

    case ADD_NEW_LIST: {
      return {
        ...state,
        List: [...state.List, action.list]
      };
    }

    case ADD_NEW_CARD_TO_LIST: {
      const newCardPayload = {
        title: action.card.title,
        description: action.card.desc
      };
      const filterList = state.List.find(l => l.id === action.card.id);
      const filterListIndex = state.List.findIndex(l => l.id === action.card.id);
      const updateList = Object.assign({}, filterList, {
        cards: [...filterList.cards, newCardPayload]
      });

      state.List.splice(filterListIndex,1,updateList)
      return{
        ...state
      }
    }

    case DELETE_CARD_FROM_LIST: {
      const listID = action.ids.lid;
      const cardID = action.ids.cid;

      const getList = state.List.findIndex(l => l.id === listID);
      state.List[getList].cards.splice(cardID,1);
      return{
        ...state
      }
    }

    default:
      return state;
  }
};

export default combineReducers({
  List
});
