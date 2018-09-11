import React from "react";
import PropTypes from 'prop-types';

import CardTitle from "./CardTitle";
// import CardDescription from "./CardDescription";

import Styles from './Card.scss';

const Card = (props) => (
  <section className={Styles.card}>
    <CardTitle title={props.title} /> 
    <button className={Styles.card__btn} onClick={props.handleDeleteCard}>X</button>
    {/* <CardDescription description={props.description} /> */}
  </section>
);


Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  handleDeleteCard: PropTypes.func.isRequired
}


export default Card;
