export const ADD_ITEM = 'qgo/assessment/ADD_ITEM';
export const REMOVE_ITEM = 'qgo/assessment/REMOVE_ITEM';
export const TOGGLE_TODO = 'qgo/assessment/TOGGLE_TODO';
export const TOGGLE_COMPLETED = 'qgo/assessment/TOGGLE_COMPLETED';

export const addItem = content => {
  return { type: ADD_ITEM, content };
};

export const removeItem = id => {
  return { type: REMOVE_ITEM, id };
};

export const toggleTodo = id => {
  return { type: TOGGLE_TODO, id };
};

export const toggleCompleted = () => {
  return { type: TOGGLE_COMPLETED };
};

export const initialState = {
  items: [
    { id: 1, content: 'Call mum', completed: false },
    { id: 2, content: 'Buy cat food', completed: true },
    { id: 3, content: 'Water the plants', completed: false },
  ],
  showCompleted: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const nextId =
        state.items.reduce((id, item) => Math.max(item.id, id), 0) + 1;
      const newItem = {
        id: nextId,
        content: action.content,
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };
      case REMOVE_ITEM:
        return {
          ...state,
          items: [...state.items.filter(item => item.id !== action.id)],
      };
      case TOGGLE_TODO:
        return {
            ...state,
            items: [...state.items.map(item => item.id === action.id
              ? {...item, completed: !item.completed}
              : item
            )]
        }
      case TOGGLE_COMPLETED:
        return {
            ...state,
            showCompleted: !state.showCompleted
        }
    default:
      return state;
  }
};

export default reducer;
