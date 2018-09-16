import * as ActionTypes from "../constants/ActionTypes";
import ListAPI from "../api/ListAPI";

const getAllListsAction = lists => ({
  type: ActionTypes.FETCH_ALL_LISTS,
  lists
});

const addNewListAction = list => ({
  type: ActionTypes.ADD_NEW_LIST,
  list
});

const addNewCardAction = card => ({
  type: ActionTypes.ADD_NEW_CARD_TO_LIST,
  card
});

const deleteCardAction = ids => ({
  type: ActionTypes.DELETE_CARD_FROM_LIST,
  ids
});

const moveCardAction = (payload) => ({
  type: ActionTypes.MOVE_CARD_FROM_LIST,
  payload
})

const getQuickEditorStateAction = () => ({
  type: ActionTypes.GET_QUICK_EDITOR_STATE
});

const openQuickEditorAction = payload => ({
  type: ActionTypes.TOGGLE_QUICK_EDITOR,
  payload
});

const updateCardTitleAction = payload => ({
  type: ActionTypes.UPDATE_CARD_TITLE,
  payload
});

const closeQuickEditorAction = () => ({
  type: ActionTypes.CLOSE_QUICK_EDITOR
});

// Action Creators
export const fetchAllLists = () => dispatch => {
  const ListService = new ListAPI();
  ListService.fetchAllLists().then(lists => {
    dispatch(getAllListsAction(lists));
  });
};

export const addNewList = listname => dispatch => {
  const payload = { title: listname, cards: [] };
  dispatch(addNewListAction(payload));
};

export const addNewCard = (id, title, desc) => dispatch => {
  const payload = { id, title, desc };
  dispatch(addNewCardAction(payload));
};

export const deleteCard = (lid, cid) => dispatch => {
  const payload = { lid, cid };
  dispatch(deleteCardAction(payload));
  dispatch(closeQuickEditorAction());
};

export const moveCard = (
  fromListID,
  lid,
  cid,
  dropIndex,
  title,
  description
) => dispatch => {
  const payload = { fromListID, lid, cid, dropIndex, title, description };
  dispatch(moveCardAction(payload))
  // dispatch(deleteCardAction({ lid: fromListID, cid }));
  // dispatch(addNewCardAction({ id: lid, title, desc: description }));
};

export const getQuickEditorState = () => dispatch => {
  dispatch(getQuickEditorStateAction());
};

export const openQuickEditor = (
  listId,
  cardId,
  cardTitle,
  top,
  left
) => dispatch => {
  top = Math.ceil(top);
  left = Math.ceil(left);
  const payload = { listId, cardId, cardTitle, top, left };
  dispatch(openQuickEditorAction(payload));
};

export const updateCardTitle = (listId, cardId, text) => dispatch => {
  const payload = { listId, cardId, text };
  dispatch(updateCardTitleAction(payload));
  dispatch(closeQuickEditorAction());
};

export const closeQuickEditor = () => dispatch => {
  dispatch(closeQuickEditorAction());
};
