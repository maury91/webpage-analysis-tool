import * as React from 'react';
import { shallow } from 'enzyme';
import { AnalyzeReport } from '../analyzeReport';

// Make the colors static instead of random
jest.mock('flat-colors', () => jest.fn().mockReturnValue([0, 0, 0]));

const analyzeData = {
  tags: [
    {
      tag: 'span',
      count: 3
    },
    {
      tag: 'div',
      count: 2
    },
    {
      tag: 'body',
      count: 1
    },
    {
      tag: 'html',
      count: 1
    }
  ],
  mostUsedAndDeepestPath: 'html > body > div > div > span'
};

describe('AnalyzeReport', () => {
  it('Simple snapshot testing', () => {
    const wrapper = shallow(<AnalyzeReport data={analyzeData} />);
    expect(wrapper).toMatchSnapshot();
  });
});
