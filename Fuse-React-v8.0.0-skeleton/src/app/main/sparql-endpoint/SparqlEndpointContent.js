import {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { setQueryData } from 'app/store/query-data/queryDataActions';
import QueryRepository from '../../repository/QueryRepository';

const SparqlEndpointContent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryRef = useRef()
    const [state, setState, stateRef] = useState({
    endpointURL: null,
    query: null,
    });

  useEffect(()=>{
      console.log("State", state)
  }, [state])

  const handleChange = (e) => {
    const { value } = e.target;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const resetQuery = () =>{
      queryRef.current.value = ""
      setState({
          ...state,
          query: null
      })
  }

  const showResults = () => {
    navigate('/sparql/result-data');
  };

  const handleSubmit = () => {
    QueryRepository.executeQuery(state).then((res) => {
      const dataBack = res.data?.results?.bindings;
      dispatch(setQueryData(dataBack));
      showResults();
    });
  };

  return (
    <>
      <form>
        <TextField
          id="standard-basic"
          label="Enter SPARQL endpoint URL"
          variant="standard"
          name="endpointURL"
          defaultValue={state.endpointURL}
          onChange={handleChange}
          style={{ width: 600 }}
          required
        />
        <br />
        <TextareaAutosize
          aria-label="minimum height"
          minRows={10}
          name="query"
          ref={queryRef}
          onChange={handleChange}
          defaultValue={state.query}
          placeholder="Write SPARQL query..."
          style={{ width: 600, marginTop: 20 }}
        />
        <br />
        <Button variant="contained" onClick={() => handleSubmit()} color="primary" className="mr-5">
          Execute query
        </Button>
        <Button variant="contained" color="secondary" onClick={() => resetQuery()}>
          Reset
        </Button>
      </form>
    </>
  );
};

export default SparqlEndpointContent;
