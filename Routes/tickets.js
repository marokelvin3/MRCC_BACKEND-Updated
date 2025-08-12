const express = require("express");
const db = require("../db");
const { isAuthenticated } = require("../middleware/middleware");

const router = express.Router();

// Create tickets table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    status TEXT DEFAULT 'open',
    created_by INTEGER
  )
`);

// Create new ticket
router.post("/", isAuthenticated, (req, res) => {
  const { title, description } = req.body;
  db.run(
    `INSERT INTO tickets (title, description, created_by) VALUES (?, ?, ?)`,
    [title, description, req.session.user.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, title, description, status: "open" });
    }
  );
});

// List all tickets
router.get("/", isAuthenticated, (req, res) => {
  db.all(`SELECT * FROM tickets`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
