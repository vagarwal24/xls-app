import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAgentProductivityReport } from "../api/datas";
import TablePagination from "@mui/material/TablePagination";
import * as XLSX from "xlsx";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    height: 60,
    width: "400px",
    border: "1px solid #fff",
    position: "sticky",
    top: 0,
    zIndex: 2, // Increase zIndex to ensure it's above the table body
  },
  [`&.${tableCellClasses.body}`]: {
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

const SecondXls = () => {
  const [agentData, setAgentData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getAgentProductivityReport(
      {
        user_id: "testing@mintifi.com",
        format: "IN",
        from_date: "2023-05-23",
        to_date: "2023-05-23",
      },
      setAgentData
    );
  }, []);

  const handleExportClick = () => {
    const columnHeader = [
      "Name of Agent",
      "Count of email Received",
      "Count of e-mails Pending",
      "Count Extraction Pending",
      "Count Pending for Approval",
      "Count of DDR Processed",
      "Count DDR Processing Failed",
      "Count of Invoices Pending",
      "Count of Invoices Completed",
      "Count of DDR Pending",
      "Count of DDR Completed",
    ];

    const dataToExport = [columnHeader, ...agentData.map((ajd) => [
      ajd.name_of_agent,
      ajd.date,
      ajd.count_of_email_received,
      ajd.count_of_e_mails_pending,
      ajd.count_extraction_pending,
      ajd.count_pending_for_approval,
      ajd.count_of_ddr_processed,
      ajd.count_ddr_processing_failed,
      ajd.count_of_invoices_pending,
      ajd.count_of_invoices_completed,
      ajd.count_of_ddr_pending,
      ajd.count_of_ddr_completed,
    ])];

    const worksheet = XLSX.utils.aoa_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AgentProductivity");

    // Export the workbook as an XLSX file
    XLSX.writeFile(workbook, "agent_productivity.xlsx");
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer component={Paper} style={{ maxHeight: "400px", overflow: "auto" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name of Agent</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Count of email Received</StyledTableCell>
              <StyledTableCell align="center">Count of e-mails Pending</StyledTableCell>
              <StyledTableCell align="center">Count Extraction Pending</StyledTableCell>
              <StyledTableCell align="center">Count Pending for Approval</StyledTableCell>
              <StyledTableCell align="center">Count of DDR Processed</StyledTableCell>
              <StyledTableCell align="center">Count DDR Processing Failed</StyledTableCell>
              <StyledTableCell align="center">Count of Invoices Pending</StyledTableCell>
              <StyledTableCell align="center">Count of Invoices Completed</StyledTableCell>
              <StyledTableCell align="center">Count of DDR Pending</StyledTableCell>
              <StyledTableCell align="center">Count of DDR Completed</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agentData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ajd) => (
                <StyledTableRow key={ajd.name_of_agent}>
                  <StyledTableCell align="center">{ajd.name_of_agent}</StyledTableCell>
                  <StyledTableCell align="center">{ajd.date}</StyledTableCell>
                  <StyledTableCell align="center">{ajd.count_of_email_received}</StyledTableCell>
                  <StyledTableCell align="center">{ajd.count_of_e_mails_pending}</StyledTableCell>
                  <StyledTableCell align="center">{ajd.count_extraction_pending}</StyledTableCell>
                  <StyledTableCell align="center">{ajd.count_pending_for_approval}</StyledTableCell>
                  <StyledTableCell align="center">{ajd.count_of_ddr_processed}</StyledTableCell>
                  <StyledTableCell align="center">{ajd.count_ddr_processing_failed}</StyledTableCell>
                  <StyledTableCell align="center">{ajd.count_of_invoices_pending}</StyledTableCell>
                  <StyledTableCell align="center">{ajd.count_of_invoices_completed}</StyledTableCell>
                  <StyledTableCell align="center">{ajd.count_of_ddr_pending}</StyledTableCell>
                  <StyledTableCell align="center">{ajd.count_of_ddr_completed}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={agentData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <button variant="contained" color="primary" onClick={handleExportClick} style={{ width: "100px", height: "30px" }}>
        Export
      </button>
    </Paper>
  );
};

export default SecondXls;
