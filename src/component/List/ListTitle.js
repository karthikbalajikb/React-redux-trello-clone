import React from "react";
import PropTypes from "prop-types";

import Styles from './List.scss';

const ListTitle = props => <p className={Styles.list__title}>{props.listTitle}</p>;

ListTitle.propTypes = {
  listTitle: PropTypes.string.isRequired
};

export default ListTitle;
