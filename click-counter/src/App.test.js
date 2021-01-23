import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });


// one line arrow function automatically returns whats inside without {} or 'return'
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});
test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});
test('renders counter display)', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});
test('counter starts at zero', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe('0');

});

describe('Increment', () => {
  test('clicking on button increments counter display', () => {
    const wrapper = setup();
    //find the button
    const button = findByTestAttr(wrapper, 'increment-button');
    //click the button
    button.simulate('click');
    //find the display, and test that the number has been incremented
    const count = findByTestAttr(wrapper, 'count').text();
    expect(count).toBe('1');
  });
})

describe('Decrement', () => {
  test('renders decrement button', () => {
    const wrapper = setup();
    const decButton = findByTestAttr(wrapper, 'decrement-button');
    expect(decButton.length).toBe(1);
  });
  test('clicking decrement button decreases counter on display when state is greater than 0', () => {
    const wrapper = setup();
    const incButton = findByTestAttr(wrapper, 'increment-button');
    incButton.simulate('click');
    const decButton = findByTestAttr(wrapper, 'decrement-button');
    decButton.simulate('click');
    const count = findByTestAttr(wrapper, 'count').text();
    expect(count).toBe('0');
  });
  test('clicking decrement button when counter is 0 does not decrement', () => {
    const wrapper = setup();
    const decButton = findByTestAttr(wrapper, 'decrement-button');
    decButton.simulate('click');
    const count = findByTestAttr(wrapper, 'count').text();
    expect(count).toBe('0');
  });
  test('clicking decrement button when counter is 0 results in error message', () => {
    const wrapper = setup();
    const decButton = findByTestAttr(wrapper, 'decrement-button');
    decButton.simulate('click');
    const errorMessage = findByTestAttr(wrapper, 'error-message').text();
    expect(errorMessage).toStrictEqual('The counter cannot go below 0');
  });
  test('when counter is above 0 there is no error message', () => {
    const wrapper = setup();
    const errorMessage = findByTestAttr(wrapper, 'error-message').text();
    const count = findByTestAttr(wrapper, 'count').text();
    const decButton = findByTestAttr(wrapper, 'decrement-button');
    const incButton = findByTestAttr(wrapper, 'increment-button');
    decButton.simulate('click');
    incButton.simulate('click');
    // expect(count).toBe('1');
    expect(errorMessage).toBe('');
  });
});

