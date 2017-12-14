import React from 'react';
import { shallow, mount } from 'enzyme';
import { ItemsList } from '../index';

const defaultProps = {
  items: [],
  onRemove: f => f,
  onToggleTodo: f => f,
};

describe('ItemsList', () => {
  it('renders without crashing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('should display warning message if no items', () => {
    const renderedItem = shallow(<ItemsList {...defaultProps} items={[]} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(1);
  });

  it('should not display warning message if items are present', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(0);
  });

  it('should render items as list items', () => {
    const items = [{ id: 1, content: 'Test 1' }, { id: 2, content: 'Test 2' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('li')).toHaveLength(2);
  });

  it('should call onRemove', () => {
    const onRemoveMock = jest.fn();
    const items = [{ id: 1, content: 'Test 1' }];
    const renderedItem = mount(<ItemsList {...defaultProps} items={items} onRemove={onRemoveMock}/>);
    renderedItem.find('.itemRemove-button').simulate('click')
    expect(onRemoveMock.mock.calls.length).toBe(1)
  });

  it('should call onToggleTodo', () => {
    const onToggleTodoMock = jest.fn();
    const items = [{ id: 1, content: 'Test 1' }];
    const renderedItem = mount(<ItemsList {...defaultProps} items={items} onToggleTodo={onToggleTodoMock}/>);
    renderedItem.find('.itemComplete-button').simulate('click')
    expect(onToggleTodoMock.mock.calls.length).toBe(1)
  });
});
