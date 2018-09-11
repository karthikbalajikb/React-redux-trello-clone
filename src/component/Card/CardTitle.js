import React from "react";
import PropTypes from "prop-types";

import Styles from './Card.scss';

const CardTitle = props => <p className={Styles.card__title}>{props.title}</p>;

CardTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default CardTitle;
