import React, { Component } from "react";
import { connect } from "react-redux";

import QuickEditModal from "../component/QuickEditModal/QuickEditModal";
import { updateCardTitle, closeQuickEditor, deleteCard } from "../actions";

import Styles from "./QuickEditor.scss";

class QuickEditor extends Component {
  render() {
    const {
      isOpen,
      listId,
      cardId,
      cardTitle,
      top,
      left
    } = this.props.quickeditor.QuickEditor;

    return (
      <React.Fragment>
        {isOpen ? (
          <div className={Styles.quickeditor}>
            <QuickEditModal
              listId={listId}
              cardId={cardId}
              cardTitle={cardTitle}
              top={top}
              left={left}
              handleSaveEdit={(listId, cardId, text) =>
                this.props.handleSaveEdit(listId, cardId, text)
              }
              handleQuickEditClose={() => this.props.handleQuickEditClose()}
              handleDeleteCard={(listId, cardId) =>
                this.props.handleDeleteCard(listId, cardId)
              }
            />
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  quickeditor: state.QuickEditor
});

const mapDispatchToProps = dispatch => ({
  handleSaveEdit: (listId, cardId, text) =>
    dispatch(updateCardTitle(listId, cardId, text)),
  handleQuickEditClose: () => dispatch(closeQuickEditor()),
  handleDeleteCard: (lid, cid) => dispatch(deleteCard(lid, cid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickEditor);
