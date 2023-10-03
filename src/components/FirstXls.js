import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getDdrEmailInvoiceData } from "../api/datas";
import TablePagination from "@mui/material/TablePagination";
import * as XLSX from "xlsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    height: 120,
    fontSize: 16,
    top: 0,
    zIndex: 1,
    border: "1px solid #fff",
  },
  [`&.${tableCellClasses.body}`]: {
    height: 80,
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FirstXls = () => {
  const [datas, setDatas] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (fromDate && toDate) {
      getDdrEmailInvoiceData(
        {
          user_id: "testing@mintifi.com",
          from_date: fromDate.toISOString(),
          to_date: toDate.toISOString(),
        },
        setDatas
      );
    }
  }, [fromDate, toDate]);

  const handleExportClick = (worksheetName, dataFields) => {
    const dataToExport = datas.map((data) =>
      dataFields.map((field) => data[field])
    );

    const columnHeader = dataFields.map((field) => field);
    const dataWithHeaders = [columnHeader, ...dataToExport];

    const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);

    XLSX.writeFile(workbook, `${worksheetName}.xlsx`);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "theme.palette.background.default",
      }}
    >
      <TableContainer component={Paper} style={{ display: "flex" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={5} align="center">
                Fetched from Email
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">E-mail Serial</StyledTableCell>
              <StyledTableCell align="center">
                From Date <br />
                <DatePicker
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="bg-green"
                  placeholderText="DATE"
                />
                <br />
                To Date <br />
                <DatePicker
                  selected={toDate}
                  onChange={(date) => {
                    if (!fromDate || date >= fromDate) {
                      setToDate(date);
                    }
                  }}
                  minDate={fromDate} // Set minimum date as the selected From Date
                  dateFormat="dd/MM/yyyy"
                  className="bg-green"
                  placeholderText="DATE"
                  showDisabledMonthNavigation // Disable navigating to previous months
                />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data) => (
                <StyledTableRow key={data.date_time}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {data.email_serial}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.date_time}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>

        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                Name of the Agent Allocated
              </StyledTableCell>
              <StyledTableCell align="center">
                Status fetched from Different System
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">Current Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data) => (
                <StyledTableRow key={data.date_time}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {data.name_agent}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {data.current_status}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>

        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={7} align="center">
                DDR PORTAL
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center">Anchor Name</StyledTableCell>
              <StyledTableCell align="center">Distributor Name</StyledTableCell>
              <StyledTableCell align="center">
                Count of Invoices
              </StyledTableCell>
              <StyledTableCell align="center">
                Total Invoice Amount
              </StyledTableCell>
              <StyledTableCell align="center">DDR Amount</StyledTableCell>
              <StyledTableCell align="center">Loan ID</StyledTableCell>
              <StyledTableCell align="center">DDR ID</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data) => (
                <StyledTableRow key={data.date_time}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {data.anchor_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.distributor_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.total_invoice_amount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.DDR_amount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.loan_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.DDR_ID}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={datas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <button
        variant="contained"
        color="primary"
        onClick={() =>
          handleExportClick("DdrEmailInvoiceData", [
            "email_serial",
            "date_time",
            "mail_body",
            "ticket_number",
            "response_template",
            "name_agent",
            "current_status",
            "anchor_name",
            "distributor_name",
            "total_invoice_amount",
            "DDR_amount",
            "DDR_ID",
            "loan_id",
            // Add all other fields here
          ])
        }
        style={{ width: "100px", height: "30px" }}
      >
        Export
      </button>
    </Paper>
  );
};

export default FirstXls;
