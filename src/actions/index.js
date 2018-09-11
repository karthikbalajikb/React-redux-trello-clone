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

const deleteCardAction = (ids) => ({
  type: ActionTypes.DELETE_CARD_FROM_LIST,
  ids
})

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
  dispatch(deleteCardAction(payload))
}