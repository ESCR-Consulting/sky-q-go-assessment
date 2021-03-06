import React from 'react';
import { shallow, mount } from 'enzyme';
import { ItemCreator } from '../index';

const defaultProps = {
  onAdd: f => f,
};

describe('ItemCreator', () => {
  it('renders without crashing', () => {
    shallow(<ItemCreator {...defaultProps} />);
  });

  it('should call onAdd with the input content', () => {
    const onAddMock = jest.fn();
    const renderedItem = mount(
      <ItemCreator {...defaultProps} onAdd={onAddMock} />
    );
    renderedItem.find('.itemCreator-input').node.value = 'New Test Item';
    renderedItem.find('.itemCreator-button').simulate('click');
    expect(onAddMock.mock.calls.length).toBe(1);
    expect(onAddMock.mock.calls[0][0]).toBe('New Test Item');
  });

  it('should call onToggleCompleted', () => {
    const onToggleCompletedMock = jest.fn();
    const renderedItem = mount(
      <ItemCreator {...defaultProps} onToggleCompleted={onToggleCompletedMock} />
    );
    renderedItem.find('.itemCreator-toggleCompleted-button').simulate('click');
    expect(onToggleCompletedMock.mock.calls.length).toBe(1);
  });

  it('should clear the input onAdd', () => {
    const renderedItem = mount(<ItemCreator {...defaultProps} />);
    renderedItem.find('.itemCreator-input').node.value = 'New Test Item';
    renderedItem.find('.itemCreator-button').simulate('click');
    expect(renderedItem.find('.itemCreator-input').node.value).toEqual('');
  });
});
