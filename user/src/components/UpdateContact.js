import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Paper,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(4, 0),
  borderRadius: "16px",
  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const UpdateContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    company: "",
    jobtitle: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch contact details when component mounts
    axios
      .get(`http://localhost:3000/contact/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Failed to fetch contact details");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/contacts/${id}`, formData)
      .then((response) => {
        if (response.data.status) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Failed to update contact");
      });
  };

  return (
    <Container maxWidth="md">
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          mt: 2,
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          mt: 3,
          fontWeight: 600,
          color: (theme) => theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <PersonIcon sx={{ fontSize: 35 }} />
        Update Contact
      </Typography>

      <StyledPaper elevation={3}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="First Name"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Last Name"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                type="email"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Mobile Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Job Title"
                name="jobtitle"
                value={formData.jobtitle}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              {errorMessage && (
                <Typography
                  color="error"
                  variant="body2"
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  {errorMessage}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  borderRadius: 2,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.12)",
                  "&:hover": {
                    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.16)",
                  },
                }}
              >
                Update Contact
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default UpdateContact;
