import React from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";

import { DragTypes } from "../../constants/DragTypes";

import CardTitle from "./CardTitle";
// import CardDescription from "./CardDescription";
// import CardWrapper from './CardWrapper';
import Styles from "./Card.scss";

const CardSource = {
  beginDrag(props) {
    console.log("begin drag", props);
    return props;
  },
  endDrag(props, monitor) {
   console.log("endDrag",props,monitor.getItem());
  },
  isDragging(props, monitor) {
     const isDragging = props.id === monitor.getItem().id;
    // console.log("isDrag", props,monitor.getItem());
    // return isDragging;
    return isDragging;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.quickeditorBtn = React.createRef();
  }

  handleMouseEnter = e => {
    this.quickeditorBtn.current.style.display = "block";
  };

  handleMouseLeave = e => {
    this.quickeditorBtn.current.style.display = "none";
  };

  offset = el => {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  };

  handleToggleQuickEdit = e => {
    let divOffset = this.offset(e.currentTarget.parentNode);
    const { top, left } = divOffset;
    return this.props.handleToggleQuickEdit(top, left);
  };

  render() {
    const { connectDragSource, isDragging, id, index } = this.props;
    return connectDragSource(
     
      <section
        id={id}
        index={index}
        className={Styles.card}
        style={{
          opacity: isDragging ? 0.5 : 1
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <CardTitle title={this.props.title} />
        <button
          ref={this.quickeditorBtn}
          className={Styles.card__btn}
          onClick={this.handleToggleQuickEdit}
        >
          ...
        </button>
        {/* <CardDescription description={props.description} /> */}
      </section>
     
    );
  }
}

Card.propTypes = {
  listID: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  handleToggleQuickEdit: PropTypes.func,
  handleMoveCard: PropTypes.func,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(DragTypes.CARD, CardSource, collect)(Card);
