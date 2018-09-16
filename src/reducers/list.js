import { combineReducers } from "redux";
import {
  FETCH_ALL_LISTS,
  ADD_NEW_LIST,
  ADD_NEW_CARD_TO_LIST,
  DELETE_CARD_FROM_LIST,
  MOVE_CARD_FROM_LIST,
  UPDATE_CARD_TITLE
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
      const newListPayload = {
        id: `L${state.List.length}`,
        ...action.list
      };
      return {
        ...state,
        List: [...state.List, newListPayload]
      };
    }

    case ADD_NEW_CARD_TO_LIST: {
      const filterListIndex = state.List.findIndex(
        l => l.id === action.card.id
      );

      const newCardPayload = {
        id: `${action.card.id}C${state.List[filterListIndex].cards.length}`,
        title: action.card.title,
        description: action.card.desc
      };
      const filterList = state.List.find(l => l.id === action.card.id);

      const updateList = Object.assign({}, filterList, {
        cards: [...filterList.cards, newCardPayload]
      });

      state.List.splice(filterListIndex, 1, updateList);
      return {
        ...state
      };
    }

    case DELETE_CARD_FROM_LIST: {
      const listID = action.ids.lid;
      const cardID = action.ids.cid;

      const getList = state.List.findIndex(l => l.id === listID);
      const getCardIndex = state.List[getList].cards.findIndex(
        c => c.id === cardID
      );
      state.List[getList].cards.splice(getCardIndex, 1);
      return {
        ...state
      };
    }

    case MOVE_CARD_FROM_LIST: {
      const { fromListID, lid, cid, title, description, dropIndex } = action.payload;

      const getList = state.List.findIndex(l => l.id === fromListID);
      const getCardIndex = state.List[getList].cards.findIndex(
        c => c.id === cid
      );
      state.List[getList].cards.splice(getCardIndex, 1);

      const newCardPayload = {
        id: cid,
        title,
        description
      };

      const filterListIndex = state.List.findIndex(l => l.id === lid);

      const filterList = state.List.find(l => l.id === lid);

      const updateList = Object.assign({}, filterList, {
        cards: [...filterList.cards.slice(0, dropIndex), newCardPayload, ...filterList.cards.slice(dropIndex)]
      });

      state.List.splice(filterListIndex, 1, updateList);
      return {
        ...state,
      };
    }

    case UPDATE_CARD_TITLE: {
      const { listId, cardId, text } = action.payload;

      const getList = state.List.findIndex(l => l.id === listId);
      const getCardIndex = state.List[getList].cards.findIndex(
        c => c.id === cardId
      );

      return {
        ...state,
        ...(state.List[getList].cards[getCardIndex].title = text)
      };
    }

    default:
      return state;
  }
};

export default combineReducers({
  List
});
