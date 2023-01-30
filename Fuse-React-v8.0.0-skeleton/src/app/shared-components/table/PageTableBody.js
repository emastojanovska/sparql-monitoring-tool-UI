import {Icon, IconButton, TableBody, TableCell, TableRow, Tooltip} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from 'react-redux';
import Delete from "@mui/icons-material/Delete";
import RemoveEndpointModal from "../../main/components/RemoveEndpointModal";
import EditEndpointModal from "../../main/components/EditEndpointModal";


function PageTableBody(props) {
  const dispatch = useDispatch();

  const [showAllItems, setShowAllItems] = React.useState(true);

  const handleShowAllItems = (id) => {
    // eslint-disable-next-line no-unused-expressions
    showAllItems === id ? setShowAllItems("") : setShowAllItems(id);
  };

  return (
    <TableBody>
      {props.rows.map((row, index) => {
        console.log("Row", row.id)
        return (
          <TableRow
            className="h-72 cursor-pointer"
            hover
            // role="checkbox"
            tabIndex={-1}
            key={index}
          >
            {row.values.map((value) => {
              return (
                <React.Fragment key={value.name}>
                  {value.type === "text" && (
                    <TableCell
                      className="p-4 sm:p-16"
                      component="th"
                      scope="row"
                    >

                      {value.value}

                    </TableCell>
                  )}
                  {value.type === "link" && (
                      <TableCell
                          className="p-4 sm:p-16"
                          component="th"
                          scope="row"
                      >
                        <a href={`${value.value}`} target='_blank' rel="noreferrer">{value.name}</a>


                      </TableCell>
                  )}
                  {value.type === "bool" && (
                    <TableCell
                      className="p-4 sm:p-16"
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {value.value ? (
                        <Icon className="text-green text-20">check_circle</Icon>
                      ) : (
                        <Icon className="text-red text-20">remove_circle</Icon>
                      )}
                    </TableCell>
                  )}
                  {value.type === "list" && (
                    <TableCell
                      className="p-4 sm:p-16"
                      component="th"
                      scope="row"
                      onClick={() => handleShowAllItems(row.id)}
                    >
                      {showAllItems !== row.id ? (
                        <ol>
                          {/* eslint-disable-next-line no-shadow */}
                          {value.value.slice(0, 3).map((item, index) => {
                            return (
                              <li key={index}>
                                {item}
                                {index === 2 && value.value.length > 3 ? (
                                  <Icon className="page_table_arrow_icons">
                                    arrow_downward
                                  </Icon>
                                ) : null}
                              </li>
                            );
                          })}
                        </ol>
                      ) : (
                        <ol>
                          {/* eslint-disable-next-line no-shadow */}
                          {value.value.map((item, index) => {
                            return (
                              <li key={index}>
                                {item}
                                {index === value.value.length - 1 &&
                                value.value.length > 3 ? (
                                  <Icon className="page_table_arrow_icons">
                                    arrow_upward
                                  </Icon>
                                ) : null}
                              </li>
                            );
                          })}
                        </ol>
                      )}
                    </TableCell>
                  )}

                  {value.type === "button" && (
                      <TableCell>
                        <Button
                            onClick={value.function}
                            variant="contained"
                            color="primary"
                            className="w-full mr-20 mt-16"
                        >
                          {value.text}
                        </Button>
                      </TableCell>
                  )}

                  {value.type === "remove-endpoint" && (
                      <TableCell>
                        <RemoveEndpointModal id={row.id}/>
                      </TableCell>
                  )}

                  {value.type === "edit-endpoint" && (
                      <TableCell>
                        <EditEndpointModal id={row.id}/>
                      </TableCell>
                  )}
                </React.Fragment>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default PageTableBody;
