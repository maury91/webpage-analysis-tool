import * as React from 'react';
import { AnalyzePageResult } from '../../main/analyze';
import { Breadcrumbs, Button, Grid, Typography } from '@material-ui/core';
import { HorizontalBar } from 'react-chartjs-2';
import { transformDataToChart } from '../utils';
import { useState } from 'react';

interface AnalyzeDisplayProps {
  data: AnalyzePageResult;
}

export const AnalyzeReport = ({ data }: AnalyzeDisplayProps) => {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => setShowAll(!showAll);
  const mostCommonTag = data.tags[0];
  return (
    <Grid container>
      <Grid item xs={12}>
        <HorizontalBar
          data={transformDataToChart(data, showAll ? Infinity : 5)}
          options={{
            title: {
              display: true,
              text: showAll ? 'All tags' : 'Top 5 tags'
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    min: 0
                  }
                }
              ]
            },
            legend: {
              display: false
            }
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Button variant="contained" color="secondary" onClick={toggleShowAll}>
            {showAll ? 'Show 5' : 'Show all'}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <p>
          The most common used tag is <strong>{mostCommonTag.tag}</strong>, it appears{' '}
          <em>{mostCommonTag.count}</em> time{mostCommonTag.count > 1 ? 's' : ''}.
        </p>
        <p>
          The path where the tag is most used and deepest is:
          <p>
            <Breadcrumbs maxItems={5}>
              {data.mostUsedAndDeepestPath.split(' > ').map((path, index) => (
                <Typography key={index} color="textPrimary">
                  {path}
                </Typography>
              ))}
            </Breadcrumbs>
          </p>
        </p>
      </Grid>
    </Grid>
  );
};
