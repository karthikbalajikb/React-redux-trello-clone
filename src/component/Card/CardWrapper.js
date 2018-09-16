import React from "react";
// import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";

import { DragTypes } from "../../constants/DragTypes";

const ListTarget = {
  drop(props, monitor, component) {
    // console.log(
    //   "WRAPPER DROP: ",
    //   props.children.props,
    //   monitor.getItem(),
    //   component
    // );
    const { listID: listId, index: dropIndex } = props.children.props;
    const {
      listID: fromListID,
      id: cardId,
      index: fromIndex,
      title,
      description
    } = monitor.getItem();

    if (fromListID === listId && fromIndex === dropIndex) {
        console.log("do nothing")
    }  else {
      props.children.props.handleMoveCard(
        fromListID,
        listId,
        cardId,
        dropIndex,
        title,
        description
      );
    }
  },
  hover(props, monitor, component) {
    // console.log(
    //   "WRAPPER HOVER: ",
    //   props,
    //   monitor.getItem(),
    //   component,
    //   monitor.getClientOffset(),
    //   findDOMNode(component).scrollTop
    // );
  },
  canDrop() {
    return true;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class CardWrapper extends React.Component {
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(<div>{this.props.children}</div>);
  }
}

export default DropTarget(DragTypes.CARD, ListTarget, collect)(CardWrapper);
