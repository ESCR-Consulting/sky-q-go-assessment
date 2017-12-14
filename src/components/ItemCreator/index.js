import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem, toggleCompleted } from '../../logic/todos';
import './styles.css';

export const ItemCreator = ({ onAdd, showCompleted, onToggleCompleted }) => {
  let inputField;

  return (
    <div className="itemCreator">
      <input
        ref={input => {
          inputField = input;
        }}
        className="itemCreator-input"
        type="text"
        placeholder="What do you need to do?"
      />
      <input
        className="itemCreator-button"
        type="button"
        value="Add Task"
        onClick={() => {
          inputField.value && onAdd(inputField.value);
          inputField.value = '';
        }}
      />
      <button
        className="itemCreator-toggleCompleted-button"
        onClick={() => onToggleCompleted()}
      >{`${showCompleted ? 'Hide' :  'Show'} completed items`}</button>
    </div>
  );
};

ItemCreator.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func,
};

const mapStateToProps = ({ todos: { showCompleted } }) => {
    return { showCompleted };
};
const mapDispatchToProps = dispatch => ({
  onAdd: newItem => dispatch(addItem(newItem)),
  onToggleCompleted: () => dispatch(toggleCompleted()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemCreator);
