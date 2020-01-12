import * as flatColor from 'flat-colors';
import { AnalyzePageResult } from '../main/analyze';
import { ChartData } from 'chart.js';

const getRandomColors = (howMany: number) =>
  new Array(howMany).fill(0).map(
    _ =>
      `rgb(${flatColor()
        .slice(0, 3)
        .join(',')})`
  );

export const transformDataToChart = (data: AnalyzePageResult, maxTagsToShow: number): ChartData => {
  const tagsToShow = Math.min(data.tags.length, maxTagsToShow);
  return {
    labels: data.tags.slice(0, tagsToShow).map(tag => tag.tag),
    datasets: [
      {
        label: '',
        data: data.tags.slice(0, tagsToShow).map(tag => tag.count),
        backgroundColor: getRandomColors(tagsToShow)
      }
    ]
  };
};
