import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import PageTableBody from 'app/shared-components/table/PageTableBody';
import { connect } from 'react-redux';
import { Grid, InputLabel, LinearProgress, Select } from '@mui/material';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import EndpointRepository from '../../repository/EndpointRepository';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 14,
    borderRadius: 10,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
  },
}))(LinearProgress);

const VoidStatistics = ({ endpoint }) => {
  const [rowResults, setRowResults] = useState([]);
  const fileDownload = require('js-file-download');
  const [mime, setMime] = useState('rdf');
  const navigate = useNavigate();
  const options = [
    { value: 'rdf', label: 'RDF/XML' },
    { value: 'ttl', label: 'TTL' },
    { value: 'json', label: 'JSON' },
  ];
  useEffect(() => {
    if (endpoint === undefined) {
      navigate('/discoverability');
    }
    EndpointRepository.getVoidData(endpoint?.id).then((res) => {
      setRowResults(res.data);
    });
  }, []);

  const generateVoid = () => {
    EndpointRepository.downloadVoid(endpoint?.id, mime).then((res) => {
      if (mime === 'json')
        fileDownload(JSON.stringify(res.data, null, 2), `${endpoint.name}-void.${mime}`, mime);
      else fileDownload(res.data, `${endpoint?.name}-void.${mime}`);
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setMime(value);
  };

  const dataRows =
    rowResults !== null &&
    rowResults.map((result) => {
      return {
        id: result.name,
        values: [
          {
            type: 'link',
            name: result.name,
            id: 'url',
            value: result.link,
          },
          {
            type: 'text',
            name: 'value',
            id: 'value',
            value: `${result.value} (xsd:integer)`,
          },
        ],
      };
    });
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        {rowResults.length > 0 && dataRows && rowResults !== undefined && endpoint && (
          <>
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              <b>
                {endpoint.name} (
                <a href={endpoint.url} target="_blank" rel="noreferrer">
                  {endpoint.url}
                </a>
                ){' '}
              </b>
            </Typography>
            <PageTableBody rows={dataRows} clickable={false} link="sparql/result-data" />
          </>
        )}
      </Grid>
      <Grid item xs={4}>
        {endpoint?.voidFileGenerated ? (
          <Paper elevation={3} sx={{ minHeight: '200px', marginRight: 2 }}>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6">
                Download VoID document and SPARQL Service Description
              </Typography>
              <p>(SPARQL Service Description is only available in TTL and RDF/XML format)</p>
              <FormControl sx={{ marginTop: 2 }}>
                <InputLabel id="demo-simple-select-label">VoID format</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={mime}
                  label="Format"
                  onChange={handleChange}
                >
                  {options.map((option) => (
                    <MenuItem value={option.value}>{option.label}</MenuItem>
                  ))}
                </Select>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  color="success"
                  onClick={generateVoid}
                >
                  DOWNLOAD
                </Button>
              </FormControl>
            </Box>
          </Paper>
        ) : (
          'The VoID file takes time to be generated ...'
        )}
        <Paper elevation={3} sx={{ minHeight: '200px', marginRight: 2 }}>
          <Box sx={{ margin: 2 }}>
            <Typography variant="h6">Coherence</Typography>
            <Box display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <BorderLinearProgress
                  variant="determinate"
                  color="info"
                  value={endpoint?.coherence * 100}
                />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                  endpoint?.coherence * 100
                )}%`}</Typography>
              </Box>
            </Box>
            <Typography variant="h6">Relation speciality</Typography>
            <Chip label={endpoint?.relationSpeciality.toFixed(2)} color="info" />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

function mapStateToProps(state) {
  return {
    endpoint: state.endpoint.endpoint,
  };
}
export default connect(mapStateToProps)(VoidStatistics);
