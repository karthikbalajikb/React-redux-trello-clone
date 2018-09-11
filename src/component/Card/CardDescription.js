import React from "react";
import PropTypes from "prop-types";

import Styles from './Card.scss';

const CardDescription = props => <p className={Styles.card__description}> {props.description} </p>;

CardDescription.propTypes = {
  description: PropTypes.string
};

export default CardDescription;
