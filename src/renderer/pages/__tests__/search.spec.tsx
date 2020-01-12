import * as React from 'react';
import { mount } from 'enzyme';
import { Search } from '../search';
import { useHistory as useHistoryT } from 'react-router-dom';

const useHistory: () => jest.Mocked<ReturnType<typeof useHistoryT>> = useHistoryT as any;

jest.mock('react-router-dom', () => {
  const push = jest.fn();
  return {
    useHistory: () => ({
      push
    })
  };
});

describe('Search page', () => {
  beforeEach(() => {
    useHistory().push.mockClear();
  });
  it('Submit button should be initial disabled and textfield empty', () => {
    const wrapper = mount(<Search />);
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.prop('disabled')).toBe(true);
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    expect(input.prop('value')).toBe('');
  });

  it('Writing a valid url should enabled the button', () => {
    const wrapper = mount(<Search />);
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.prop('disabled')).toBe(true);
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    input.simulate('change', {
      target: {
        value: 'google.com'
      }
    });
    const updatedButton = wrapper.find('button');
    expect(updatedButton.prop('disabled')).toBe(false);
  });

  it('Invalid urls should show an error when blurring from the input', () => {
    const wrapper = mount(<Search />);
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.prop('disabled')).toBe(true);
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    input.simulate('change', {
      target: {
        value: 'google'
      }
    });
    input.simulate('blur');
    const updatedButton = wrapper.find('button');
    expect(updatedButton.prop('disabled')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('Submitting should navigate to the analyze page', () => {
    const wrapper = mount(<Search />);
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.prop('disabled')).toBe(true);
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
    input.simulate('change', {
      target: {
        value: 'google.com'
      }
    });
    input.simulate('submit');
    expect(useHistory().push).toHaveBeenCalledTimes(1);
    expect(useHistory().push).toHaveBeenCalledWith({ hash: 'google.com', pathname: '/analyze' });
  });
});
