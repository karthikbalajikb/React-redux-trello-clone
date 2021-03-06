import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import List from "../component/List/List";
import AddButton from "../component/AddButton/AddButton";
import { addNewList, addNewCard, moveCard, openQuickEditor } from "../actions";

import Styles from "./List.scss";

class ListContainer extends Component {
  render() {
    return (
      <div className={Styles.list__container}>
        {this.props.lists.List.List.map((d, i) => (
          <List
            id={d.id}
            title={d.title}
            cards={d.cards}
            key={d.title + i}
            handleAddNewCard={(id, name) =>
              this.props.handleAddNewCard(id, name)
            }
            handleToggleQuickEdit={(listId, cardId, cardTitle, top, left) =>
              this.props.handleToggleQuickEdit(
                listId,
                cardId,
                cardTitle,
                top,
                left
              )
            }
            handleMoveCard={(fromListID, listId, cardId, dropIndex, title, description) =>
              this.props.handleMoveCard(
                fromListID,
                listId,
                cardId,
                dropIndex,
                title,
                description
              )
            }
          />
        ))}
        <AddButton
          name="Add another List"
          handleAddNewItem={name => this.props.handleAddNewItem(name)}
        />
      </div>
    );
  }
}

ListContainer.propTypes = {
  Lists: PropTypes.objectOf(
    PropTypes.shape({
      Loading: PropTypes.bool.isRequired,
      List: PropTypes.arrayOf(
        PropTypes.shape({
          cards: PropTypes.array.isRequired,
          title: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired
        })
      )
    })
  ),
  handleAddNewItem: PropTypes.func.isRequired,
  handleAddNewCard: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lists: state.List
});

const mapDispatchToProps = dispatch => ({
  handleAddNewItem: name => dispatch(addNewList(name)),
  handleAddNewCard: (id, name) =>
    dispatch(addNewCard(id, name, "demo card description")),
  handleToggleQuickEdit: (listId, cardId, cardTitle, top, left) =>
    dispatch(openQuickEditor(listId, cardId, cardTitle, top, left)),
  handleMoveCard: (fromListID, listId, cardId, dropIndex, title, description) =>
    dispatch(moveCard(fromListID, listId, cardId, dropIndex, title, description))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);
