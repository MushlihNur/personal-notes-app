import React from "react";
import PropTypes from 'prop-types';
import { FiCheck } from "react-icons/fi";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    }

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      }
    })
  }

  onBodyChangeHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      }
    })
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <>
        <div className="add-new-page__input">
          <input type="text" className="add-new-page__input__title" placeholder="Catatan rahasia" value={this.state.title} onChange={this.onTitleChangeHandler}/>
          <div className="add-new-page__input__body" contentEditable="true" data-placeholder="Sebenarnya saya adalah ...." value={this.state.body} onInput={this.onBodyChangeHandler}></div>
        </div>
        <div className="add-new-page__action">
          <button type="button" className="action" onClick={this.onSubmitEventHandler}>
            <FiCheck />
          </button>
        </div>
      </>
    )
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
}

export default NoteInput;