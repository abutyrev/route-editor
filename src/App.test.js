import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App component tests', () => {
  const initialState = {
    points: []
  }
  const AppComponent = shallow(<App />);

  
  it('should render correctly', () => {
    expect(AppComponent).toMatchSnapshot();
  });

  it('should init with correct state', () => {
    expect(AppComponent.state()).toEqual(initialState);
  });
});