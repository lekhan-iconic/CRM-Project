import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Add contact route
router.post("/addcontact", async (req, res) => {
  try {
    const { fname, lname, email, phone, company, jobtitle } = req.body;

    const [result] = await pool.execute(
      "INSERT INTO contacts (fname, lname, email, phone, company, jobtitle) VALUES (?, ?, ?, ?, ?, ?)",
      [fname, lname, email, phone.toString(), company, jobtitle] // Convert phone to string
    );

    return res.json({
      status: true,
      message: "Record registered",
      contactId: result.insertId,
    });
  } catch (error) {
    console.error("Error adding contact:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get contacts route
router.get("/contacts", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM contacts");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get contact by ID route
router.get("/contact/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid contact ID",
      });
    }

    const [rows] = await pool.execute(
      "SELECT * FROM contacts WHERE contact_id = ?",
      [id]
    );

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update contact route
router.put("/updatecontact/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { fname, lname, email, phone, company, jobtitle } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid contact ID",
      });
    }

    const [result] = await pool.execute(
      `UPDATE contacts 
       SET fname = ?, lname = ?, email = ?, phone = ?, company = ?, jobtitle = ? 
       WHERE contact_id = ?`,
      [fname, lname, email, phone, company, jobtitle, id]
    );

    if (result.affectedRows > 0) {
      res.json({
        status: true,
        message: "Contact updated successfully",
      });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete contact route
router.delete("/contacts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id); // Convert id to integer

    // Validate id
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid contact ID",
      });
    }

    const [result] = await pool.execute(
      "DELETE FROM contacts WHERE contact_id = ?",
      [id]
    );

    if (result.affectedRows > 0) {
      res.json({
        status: true,
        message: "Contact deleted successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Contact not found",
      });
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
});

export { router as ContactRouter };
