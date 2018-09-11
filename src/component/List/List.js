import React from "react";
import PropTypes from "prop-types";

import ListTitle from "./ListTitle";
import Card from "../Card/Card";
import QuickMenuButton from "../QuickMenu/QuickMenuButton";
import AddButton from "../AddButton/AddButton";

import Styles from "./List.scss";

const List = props => (
  <article>
    <section className={Styles.list}>
      <header className={Styles.list__header}>
        <ListTitle listTitle={props.title} />
        <QuickMenuButton />
      </header>
      <div className={Styles.list__content}>
        {props.cards.map((d,i) => (
          <Card id={d.id} title={d.title} description={d.description} key={d.title+i} handleDeleteCard={() => props.handleDeleteCard(props.id,d.id)} />
        ))}
      </div>
      <AddButton name="Add another card" handleAddNewItem={() => props.handleAddNewCard(props.id)} />
    </section>
  </article>
);

List.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  ),
  handleAddNewCard: PropTypes.func,
  handleDeleteCard: PropTypes.func
};

export default List;
