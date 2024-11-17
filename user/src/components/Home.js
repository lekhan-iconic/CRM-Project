import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
  TablePagination,
  TableSortLabel,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("fname");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    axios
      .get("http://localhost:3000/contacts")
      .then((response) => setContacts(response.data))
      .catch((err) => console.log(err));
  };

  // Sorting function
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Sort function for data
  const sortData = (data) => {
    return data.sort((a, b) => {
      const aValue = a[orderBy]?.toString().toLowerCase() || "";
      const bValue = b[orderBy]?.toString().toLowerCase() || "";

      if (order === "asc") {
        return aValue.localeCompare(bValue);
      }
      return bValue.localeCompare(aValue);
    });
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (contactId) => {
    axios
      .delete(`http://localhost:3000/contacts/${contactId}`)
      .then((response) => {
        if (response.data.status) {
          fetchContacts();
        }
      })
      .catch((err) => console.log(err));
  };

  // Column definitions
  const columns = [
    { id: "fname", label: "First Name" },
    { id: "lname", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Mobile" },
    { id: "company", label: "Company" },
    { id: "jobtitle", label: "Job Title" },
  ];

  // Get current page data
  const sortedData = sortData([...contacts]);
  const currentPageData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ my: 3, textAlign: "center" }}>
        Contact Management
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/add")}
        sx={{ mb: 2 }}
      >
        Add Contact
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((contact) => (
              <TableRow key={contact.contact_id}>
                <TableCell>{contact.fname}</TableCell>
                <TableCell>{contact.lname}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobtitle}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/update/${contact.contact_id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(contact.contact_id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default Home;
