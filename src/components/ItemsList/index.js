import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeItem, toggleTodo } from '../../logic/todos';
import './styles.css';

export const ItemsList = ({ items, showCompleted, onRemove, onToggleTodo }) => {
  return (
    <div>
      <ul className="itemsList-ul">
        {items.length < 1 && <p id="items-missing">Add some tasks above.</p>}
        {items.map(item => item.completed && showCompleted ?
          <li key={item.id} className={`item ${item.completed ? 'item--itemCompleted' : ''}`}>
            {item.content}
            <button onClick={() => onRemove(item.id)} className="itemRemove-button">Remove</button>
            <button onClick={() => onToggleTodo(item.id)} className="itemComplete-button">Complete</button>
          </li>
            : !item.completed && <li key={item.id} className={`item ${item.completed ? 'item--itemCompleted' : ''}`}>
                {item.content}
                <button onClick={() => onRemove(item.id)} className="itemRemove-button">Remove</button>
                <button onClick={() => onToggleTodo(item.id)} className="itemComplete-button">Complete</button>
            </li>
        )}
      </ul>
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
};

const mapStateToProps = ({ todos: { items, showCompleted} }) => {
  return { items, showCompleted };
};

const mapDispatchToProps = dispatch => ({
    onRemove: id => dispatch(removeItem(id)),
    onToggleTodo: id => dispatch(toggleTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
