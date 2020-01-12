import * as React from 'react';
import { useState } from 'react';
import { Container, TextField, InputAdornment, Button, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageRounded';
import { Heading } from '../components/heading';

const isValidUrl = (url: string) =>
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(url);

export const Search = () => {
  const [query, setQuery] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const history = useHistory();
  const isInvalid = !isValidUrl(query);
  const showError = showValidation && isInvalid;
  const startShowingValidation = () => {
    if (!showValidation) {
      setShowValidation(true);
    }
  };
  const navigateTo = () => {
    if (!isInvalid) {
      history.push({
        pathname: '/analyze',
        hash: query
      });
    }
  };

  return (
    <Container>
      <form onSubmit={navigateTo} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Heading>Web-page analysis tool</Heading>
          </Grid>
          <Grid item xs={12}>
            <p>
              Write the url of a webpage in to field below and press <em>Analyze</em> to analyze the
              page.
            </p>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Web page URL"
              id="url"
              value={query}
              onChange={event => setQuery(event.target.value)}
              error={showError}
              helperText={showError ? 'Invalid URL.' : ''}
              onBlur={startShowingValidation}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Button variant="contained" color="primary" disabled={isInvalid} type="submit">
                Analyze
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
