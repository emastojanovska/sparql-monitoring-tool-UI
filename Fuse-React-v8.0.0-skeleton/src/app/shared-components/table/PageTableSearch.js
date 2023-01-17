import {
  Autocomplete,
  Icon,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

function PageTableSearch(props) {
  const yesNo = [
    { label: "да", name: true },
    { label: "не", name: false },
  ];

  const [keyword, setKeyword] = useState("");
  const [keywordText, setKeywordText] = useState("");
  const [valueRow, setValueRow] = useState([]);

  const mapRowValue = (id, value) => {
    let element = {};
    element.key = id;
    element.value = value;
    setValueRow([...valueRow.filter((x) => x.key != element.key), element]);
  };

  return (
    <TableRow className="h-72 cursor-pointer">
      {props.rows.map((row) => {
        return (
          <React.Fragment key={row.id}>
            {row.type === "text" && (
              <TableCell className="p-4 md:p-6" component="th" scope="row">
                <TextField
                  id={row.id}
                  className="searchField"
                  variant="outlined"
                  value={valueRow
                    .filter((x) => x.key === row.id)
                    .map((x) => x.value)}
                  name="keywordText"
                  size="small"
                  disabled={false}
                  onChange={(e, eventValue) => {
                    mapRowValue(row.id, e.target.value);
                    setKeywordText(e.target.value);
                    props.handleSearch(row.id, e.target.value);
                  }}
                />
              </TableCell>
            )}
            {row.type === "bool" && (
              <TableCell className="p-4 md:p-6" scope="row">
                <Autocomplete
                  disablePortal
                  fullWidth
                  size="small"
                  id={row.id}
                  name={row.id}
                  onChange={(e, eventValue) => {
                    if (eventValue) {
                      setKeyword(eventValue.name);
                      props.handleSearch(row.id, eventValue.name);
                    } else {
                      setKeyword("");
                      props.handleSearch(row.id, "");
                    }
                  }}
                  options={yesNo}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={row.error}
                      variant="outlined"
                      label={row.label}
                    />
                  )}
                />
              </TableCell>
            )}
            {row.type === "dropdown" && (
              <TableCell className="p-4 md:p-6" component="th" scope="row">
                <Autocomplete
                  disablePortal
                  fullWidth
                  size="small"
                  id={row.id}
                  name={row.id}
                  onChange={(e, eventValue) => {
                    if (eventValue) {
                      setKeyword(eventValue.name);
                      props.handleSearch(row.id, eventValue.name);
                    } else {
                      setKeyword("");
                      props.handleSearch(row.id, "");
                    }
                  }}
                  options={row.elements}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={row.error}
                      variant="outlined"
                      label={row.label}
                    />
                  )}
                />
              </TableCell>
            )}
           {
               row.type === 'empty' &&
               <TableCell/>
           }
          </React.Fragment>
        );
      })}
    </TableRow>
  );
}
export default PageTableSearch;