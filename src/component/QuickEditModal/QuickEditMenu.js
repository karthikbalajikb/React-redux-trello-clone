import React from "react";
import PropTypes from "prop-types";

import Styles from "./QuickEditModal.scss";

const QuickEditMenu = props => (
  <section className={Styles.quickeditmenu}>
    <div
      className={Styles.quickeditmenu__btns}
      onClick={props.handleDeleteCard}
    >
      Delete
    </div>
    <div className={Styles.quickeditmenu__btns}>Move</div>
    <div className={Styles.quickeditmenu__btns}>Copy</div>
  </section>
);

QuickEditMenu.propTypes = {
  handleDeleteCard: PropTypes.func
};

export default QuickEditMenu;
