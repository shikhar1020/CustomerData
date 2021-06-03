import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import OfflinePinIcon from "@material-ui/icons/OfflinePin";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import api from "./api";
import "./Customer.css";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Donut", 452, 25.0, 51, 4.9),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
//   createData("Honeycomb", 408, 3.2, 87, 6.5),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Jelly Bean", 375, 0.0, 94, 0.0),
//   createData("KitKat", 518, 26.0, 65, 7.0),
//   createData("Lollipop", 392, 0.2, 98, 0.0),
//   createData("Marshmallow", 318, 0, 81, 2.0),
//   createData("Nougat", 360, 19.0, 9, 37.0),
//   createData("Oreo", 437, 18.0, 63, 4.0),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "avatar",
    numeric: false,
    disablePadding: false,
    label: "Avatar",
    // minWidth: 30,
  },
  {
    id: "firstname",
    numeric: false,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "lastname",
    numeric: false,
    disablePadding: false,
    label: "Last Name",
  },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "phone", numeric: false, disablePadding: false, label: "Phone" },
  { id: "haspremium", numeric: false, disablePadding: false, label: "Premium" },
  { id: "bids", numeric: true, disablePadding: false, label: "Bid" },
  { id: "button", numeric: false, disablePadding: false, label: "BID Detail" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            // align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontWeight: "bold" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: "#C5EEF7",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [showMaxBid, setShowMaxBid] = useState(props);

  useEffect(() => {
    setShowMaxBid(props);
    console.log("Bid Changed");
  }, []);

  console.log("Current Value of Bid is", showMaxBid);

  const showMinbid = () => {
    if (showMaxBid === true) {
      setShowMaxBid(false);
      console.log("Show Minimum Bid");
    }
  };

  const showMaxbid = () => {
    if (showMaxBid === false) {
      setShowMaxBid(true);
      console.log("Show Maximum Bid");
    }
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <h3>Customer Data</h3>
        </Typography>
      )}
      {/* <ToggleButtonGroup
        value={showMaxBid}
        exclusive
        size="small"
        aria-label="text alignment"
      >
        <ToggleButton
          value="on"
          style={{
            color: "black",
            fontSize: ".8rem",
            fontFamily: "monospace",
            fontWeight: "bold",
          }}
          aria-label="left aligned"
          backgroundColor="blue"
          onClick={() => {
            showMinbid();
          }}
        >
          Minimum Bid
        </ToggleButton>
        <ToggleButton
          value="off"
          style={{
            color: "black",
            fontSize: ".8rem",
            fontFamily: "monospace",
            fontWeight: "bold",
          }}
          aria-label="right aligned"
          onClick={() => {
            showMaxbid();
          }}
        >
          Maximum Bid
        </ToggleButton>
      </ToggleButtonGroup> */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    border: "4px solid #BEDAE0",
    borderRadius: ".5rem",
    textAlign: "center",
    backgroundColor: "#C5EEF7", //"aquamarine",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2rem",
    // top: "50%",
    // marginBottom: "auto",
    // marginTop: "auto",
    // margin: " 0 auto",
    // margin: 0,
    // position: "absolute",
    // top: "50%",
    // left: "50%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function Customer() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dataRows, setDataRows] = useState([]);

  // const { showMaxBid } = props;

  // console.log("Bid", showMaxBid);

  useEffect(() => {
    const getData = async () => {
      // console.log("Testing");
      try {
        api
          .getCustomerData()
          .then((res) => {
            console.log("Customer Data", res.data);
            let customerData = res.data;
            setDataRows(customerData);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataRows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dataRows.length - page * rowsPerPage);

  // const showMaxBid = true;

  const [showMaxBid, setShowMaxBid] = useState(true);

  // useEffect(() => {
  //   setShowMaxBid(props);
  //   console.log("Bid Changed");
  // }, []);

  console.log("Current Value of Bid is", showMaxBid);

  const showMinbid = () => {
    if (showMaxBid === true) {
      setShowMaxBid(false);
      console.log("Show Minimum Bid");
    }
  };

  const showMaxbid = () => {
    if (showMaxBid === false) {
      setShowMaxBid(true);
      console.log("Show Maximum Bid");
    }
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          // showMaxBid={showMaxBid}
        />
        <div className="toggleButton">
          <ToggleButtonGroup
            value={showMaxBid}
            exclusive
            size="small"
            aria-label="text alignment"
          >
            <ToggleButton
              value="on"
              style={{
                color: "black",
                fontSize: ".8rem",
                fontFamily: "monospace",
                fontWeight: "bold",
              }}
              aria-label="left aligned"
              backgroundColor="blue"
              onClick={() => {
                showMinbid();
              }}
            >
              Minimum Bid
            </ToggleButton>
            <ToggleButton
              value="off"
              style={{
                color: "black",
                fontSize: ".8rem",
                fontFamily: "monospace",
                fontWeight: "bold",
              }}
              aria-label="right aligned"
              onClick={() => {
                showMaxbid();
              }}
            >
              Maximum Bid
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "medium" : "small"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={dataRows.length}
            />
            <TableBody>
              {stableSort(dataRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell> */}
                      {/* <Link to={`/bid/${row.id}`}> */}
                      {headCells.map((headCell) => {
                        let value = row[headCell.id];
                        //-------------------column for avatar
                        if (headCell.id === "avatar") {
                          return (
                            <TableCell key={headCell.id} align="center">
                              <Avatar
                                style={{ marginLeft: "1rem" }}
                                alt={row.firstname}
                                src={row.avatarUrl}
                              />
                            </TableCell>
                          );
                        } else if (headCell.id === "firstname") {
                          return (
                            <TableCell
                              key={headCell.id}
                              align="center"
                              // style={{ textDecoration: "none" }}
                            >
                              {row.firstname}
                            </TableCell>
                          );
                        } else if (headCell.id === "lastname") {
                          return (
                            <TableCell key={headCell.id} align="center">
                              {row.lastname}
                            </TableCell>
                          );
                        } else if (headCell.id === "email") {
                          return (
                            <TableCell key={headCell.id} align="center">
                              {row.email}
                            </TableCell>
                          );
                        } else if (headCell.id === "phone") {
                          return (
                            <TableCell key={headCell.id} align="center">
                              {row.phone}
                            </TableCell>
                          );
                        } else if (headCell.id == "haspremium") {
                          if (row.hasPremium === true) {
                            return (
                              <TableCell key={headCell.id} align="center">
                                <OfflinePinIcon style={{ color: "green" }} />
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={headCell.id} align="center">
                                <RemoveCircleIcon style={{ color: "red" }} />
                              </TableCell>
                            );
                          }
                        } else if (headCell.id === "bids") {
                          const maxBid = Math.max.apply(
                            Math,
                            row.bids.map(function (o) {
                              return o.amount;
                            })
                          );
                          const minBid = Math.min.apply(
                            Math,
                            row.bids.map(function (o) {
                              return o.amount;
                            })
                          );
                          return (
                            <TableCell key={headCell.id} align="center">
                              {showMaxBid ? maxBid : minBid}
                              {/* {maxBid} */}
                              {/* {minBid} */}
                              {/* {row.bids.length} */}
                            </TableCell>
                          );
                        } else if (headCell.id === "button") {
                          return (
                            <TableCell key={headCell.id}>
                              <Link to={`/bid/${row.id}`}>
                                <button className="linkButton">View</button>
                              </Link>
                            </TableCell>
                          );
                        }
                        // return (
                        //   <TableCell key={headCell.id} align="center">
                        //     {headCell.format //&& typeof value === "number"
                        //       ? headCell.format(value)
                        //       : value}
                        //   </TableCell>
                        // );
                      })}
                      {/* </Link> */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Expand"
      />
    </div>
  );
}
