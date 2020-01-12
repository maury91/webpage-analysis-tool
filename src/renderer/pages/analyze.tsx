import * as React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/AddRounded';
import { useEffect, useState } from 'react';
import { analysePage } from '../../common/communication';
import { Container, LinearProgress } from '@material-ui/core';
import { AnalyzePageResult } from '../../main/analyze';
import { AnalyzeReport } from '../components/analyzeReport';

export const Analyze = () => {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyzePageResult | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const url = location.hash.slice(1);
  useEffect(() => {
    setLoading(true);
    analysePage(url)
      .then((result: AnalyzePageResult) => {
        setData(result);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);
  const goToSearch = () => {
    history.push('/search');
  };
  if (loading) {
    return (
      <div>
        <LinearProgress />
        <Container>Downloading and analyzing web page</Container>
      </div>
    );
  }
  return (
    <div>
      <Fab color="primary" variant="extended" onClick={goToSearch}>
        <AddIcon />
        Analyze another
      </Fab>
      <Container>
        {error && 'An error happen while downloading or analyzing the data : ' + error.message}
        {data && <AnalyzeReport data={data} />}
      </Container>
    </div>
  );
};
