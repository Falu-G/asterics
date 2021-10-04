import React, { useState, useContext } from "react";
import { useToasts } from "react-toast-notifications";

import { MenuContext } from "../../components/MenuContext";
import Menus from "../../components/menu/Menu";
import White from "../../components/whitenav/White";
import * as ReactBootStrap from "react-bootstrap";
import SessionExpired from "../SessionExpired/SessionExpired";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { useTable, usePagination, useRowSelect } from "react-table";
import Button from "@mui/material/Button";
import { Checkbox } from "../../components/Checkbox";




const style = {
    position: "absolute",
    width: 700,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

function ShowUpEmail({handleSelectCustomers,allCustomers, handleClose, loading, open }) {
    const columns = React.useMemo(
        () => [
          {
            Header: "Full Name",
            accessor: "firstname",
          },
          {
            Header: "Email",
            accessor: "email",
          },
        ],
        []
      );
    
      const tableInstance = useTable(
        { columns, data: allCustomers },
        usePagination,
        useRowSelect,
        (hooks) => {
          hooks.visibleColumns.push((columns) => {
            return [
              {
                id: "name",
                Header: ({ getToggleAllRowsSelectedProps }) => (
                  <Checkbox {...getToggleAllRowsSelectedProps()} />
                ),
    
                Cell: ({ row }) => {
                  return <Checkbox {...row.getToggleRowSelectedProps()} />;
                },
              },
              ...columns,
            ];
          });
        }
      );
    
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        state,
        pageOptions,
        selectedFlatRows,
      } = tableInstance;
    
      const page = rows.slice(0, 10);
      const { pageIndex } = state;
    


    return (
        <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Contact List
              </Typography>
              {loading ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    width={`100%`}
                    height={50}
                  />
                  <Skeleton variant="text" height={50} />
                  <Skeleton variant="text" height={50} />
                  <Skeleton variant="text" height={50} />
                  <Skeleton variant="text" height={50} />
                  <Skeleton variant="text" height={50} />
                </>
              ) : (
                <>
                  <div>
                    <table {...getTableProps()}>
                      <thead>
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                              <th {...column.getHeaderProps()}>
                                {column.render("Header")}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      {/* Apply the table body props */}
                      <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map((cell) => {
                                return (
                                  <td {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    <div
                      style={{
                        marginTop: "10px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        disabled={!canNextPage}
                        onClick={() => previousPage()}
                        variant="contained"
                      >
                        Previous page
                      </Button>

                      <span>
                        Page{" "}
                        <strong>
                          {pageIndex + 1} of {pageOptions.length}
                        </strong>
                      </span>
                      <Button
                        disabled={!canPreviousPage}
                        onClick={() => nextPage()}
                        variant="contained"
                      >
                        Next Page
                      </Button>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        marginTop: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={""}
                      >
                        CONFIRM SELECTION
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
    )
}

export default ShowUpEmail
