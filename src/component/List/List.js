import React from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";

import ListTitle from "./ListTitle";
import Card from "../Card/Card";
import QuickMenuButton from "../QuickMenu/QuickMenuButton";
import AddButton from "../AddButton/AddButton";

import { DragTypes } from "../../constants/DragTypes";

import Styles from "./List.scss";

const ListTarget = {
  drop(props, monitor, component) {
    const { id: listId } = props;
    const {
      listID: fromListID,
      id: cardId,
      title,
      description
    } = monitor.getItem();
    props.handleMoveCard(fromListID, listId, cardId, title, description);
  },
  hover(props, monitor, component) {}
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class List extends React.Component {
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <article>
        <section className={Styles.list}>
          <header className={Styles.list__header}>
            <ListTitle listTitle={this.props.title} />
            <QuickMenuButton />
          </header>
          <div className={Styles.list__content}>
            {this.props.cards.map((d, i) => (
              <Card
                listID={this.props.id}
                id={d.id}
                title={d.title}
                description={d.description}
                key={d.title + i}
                handleToggleQuickEdit={(top, left) =>
                  this.props.handleToggleQuickEdit(
                    this.props.id,
                    d.id,
                    d.title,
                    top,
                    left
                  )
                }
              />
            ))}
          </div>
          <AddButton
            name="Add another card"
            handleAddNewItem={name =>
              this.props.handleAddNewCard(this.props.id, name)
            }
          />
        </section>
      </article>
    );
  }
}

List.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  ),
  handleAddNewCard: PropTypes.func,
  handleToggleQuickEdit: PropTypes.func,
  handleMoveCard: PropTypes.func
};

export default DropTarget(DragTypes.CARD, ListTarget, collect)(List);
