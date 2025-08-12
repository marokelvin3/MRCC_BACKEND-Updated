const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const path = require("path");

const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/tickets");

const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use(
  session({
    store: new SQLiteStore({ db: "sessions.db", dir: __dirname }),
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Change to true if using HTTPS
  })
);

app.use("/auth", authRoutes);
app.use("/tickets", ticketRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
