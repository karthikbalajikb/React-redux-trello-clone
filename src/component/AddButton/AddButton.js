import React, { Component } from "react";
import PropTypes from "prop-types";

import Styles from "./AddButton.scss";

class AddButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMode: false
    };
    this.addtext_box = React.createRef();
  }

  toggleTextBox = flag => {
    this.setState({ openMode: flag });
  };

  handleAddNewItem = () => {
    let text =
      this.props.name.indexOf("List") > -1
        ? document.getElementById("tc_add_text_box").value
        : this.addtext_box.current.value;
    this.props.handleAddNewItem(text);
    this.resetText()
  };

  resetText = () => {
    this.props.name.indexOf("List") > -1
      ? (document.getElementById("tc_add_text_box").value = "")
      : (this.addtext_box.current.value = "");
  };

  render() {
    const { name } = this.props;
    return (
      <div>
        {this.state.openMode ? (
          <div className={Styles.addtext}>
            {name.indexOf("List") > -1 ? (
              <input
                id="tc_add_text_box"
                type="text"
                className={Styles.addtext__input}
              />
            ) : (
              <textarea
                ref={this.addtext_box}
                id="tc_add_text_area"
                className={Styles.addtext__input}
              />
            )}
            <button
              className={Styles.addtext__btn}
              onClick={this.handleAddNewItem}
            >
              {name}
            </button>
            <button
              className={Styles.addtext__cancelbtn}
              onClick={() => this.toggleTextBox(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div
            className={Styles.addbutton}
            onClick={() => this.toggleTextBox(true)}
          >
            <a> + {name} </a>
          </div>
        )}
      </div>
    );
  }
}

AddButton.propTypes = {
  name: PropTypes.string.isRequired,
  handleAddNewItem: PropTypes.func
};

export default AddButton;
