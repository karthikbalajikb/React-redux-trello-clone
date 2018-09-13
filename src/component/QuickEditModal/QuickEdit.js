import React from "react";
import PropTypes from "prop-types";
import Styles from "./QuickEditModal.scss";

const QuickEdit = props => (
  <section className={Styles.quickedit}>
    <textarea
      id="quickedit__textarea"
      className={Styles.quickedit__textarea}
      defaultValue={props.cardTitle}
    />
    <button
      className={Styles.quickedit__savebtn}
      onClick={() =>
        props.handleSaveEdit(
          document.getElementById("quickedit__textarea").value
        )
      }
    >
      Save
    </button>
    <button
      className={Styles.quickedit__closebtn}
      onClick={props.handleQuickEditClose}
    >
      Close
    </button>
  </section>
);

QuickEdit.propTypes = {
  listId: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  handleSaveEdit: PropTypes.func,
  handleQuickEditClose: PropTypes.func
};

export default QuickEdit;
