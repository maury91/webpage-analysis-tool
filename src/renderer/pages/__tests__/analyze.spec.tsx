import { useHistory as useHistoryT } from 'react-router-dom';
import { mount } from 'enzyme';
import { Analyze } from '../analyze';
import * as React from 'react';
import { analysePage as analysePageT } from '../../../common/communication';

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

const useHistory: () => jest.Mocked<ReturnType<typeof useHistoryT>> = useHistoryT as any;
const analysePage: jest.MockedFunction<typeof analysePageT> = analysePageT as any;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

jest.mock('react-router-dom', () => {
  const push = jest.fn();
  return {
    useHistory: () => ({
      push
    }),
    useLocation: () => ({
      hash: '#google.com'
    })
  };
});
jest.mock('../../../common/communication', () => ({
  analysePage: jest.fn().mockRejectedValue(new Error(''))
}));

describe('Analyze page', () => {
  beforeEach(() => {
    analysePage.mockClear();
    useHistory().push.mockClear();
  });

  it('Page should be initially in a loading state and should call analyzePage', () => {
    const wrapper = mount(<Analyze />);
    const progressBar = wrapper.find('div[role="progressbar"]');
    expect(progressBar).toHaveLength(1);
    expect(analysePage).toHaveBeenCalledTimes(1);
    expect(analysePage).toHaveBeenCalledWith('google.com');
  });

  it('If analysePage fails it should show an error', async () => {
    const promise = Promise.reject(new Error('foo'));
    analysePage.mockReturnValueOnce(promise);
    const wrapper = mount(<Analyze />);
    // Catch the rejected promise
    try {
      await promise;
    } catch (err) {
      //
    }
    await sleep(1);
    wrapper.update();
    const container = wrapper.find('div.MuiContainer-root');
    expect(container).toHaveLength(1);
    expect(container.text()).toBe('An error happen while downloading or analyzing the data : foo');
  });

  it('After analysePage succeed it should show the expected data', async () => {
    const promise = Promise.resolve(analyzeData);
    analysePage.mockReturnValueOnce(promise);
    const wrapper = mount(<Analyze />);
    await promise;
    await sleep(1);
    wrapper.update();
    const container = wrapper.find('div.MuiContainer-root');
    expect(container).toHaveLength(1);
    expect(container.text()).toContain('The most common used tag is span, it appears 3 times.');
    expect(container.text()).toContain(
      'The path where the tag is most used and deepest is:html/body/div/div/span'
    );
  });

  it('"Analyze another" should navigate to search', async () => {
    const promise = Promise.resolve(analyzeData);
    analysePage.mockReturnValueOnce(promise);
    const wrapper = mount(<Analyze />);
    await promise;
    await sleep(1);
    wrapper.update();
    const analyzeAnotherButton = wrapper.find('button.MuiFab-primary');
    expect(analyzeAnotherButton).toHaveLength(1);
    expect(useHistory().push).toHaveBeenCalledTimes(0);
    analyzeAnotherButton.simulate('click');
    expect(useHistory().push).toHaveBeenCalledTimes(1);
    expect(useHistory().push).toHaveBeenCalledWith('/search');
  });
});
