const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const path = require("path");
const cors = require("cors");

const authRoutes = require("./Routes/auth");
const ticketRoutes = require("./Routes/tickets");

const app = express();

const FRONTEND_URL = "https://lighthearted-crisp-76ee3c.netlify.app";

// ✅ CORS FIRST — handles preflight and credentials
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors({
  origin: FRONTEND_URL,
  credentials: true
}));

app.set("trust proxy", 1);
app.use(express.json());

// ✅ Session AFTER CORS
app.use(
  session({
    store: new SQLiteStore({ db: "sessions.db", dir: __dirname }),
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: true,
      httpOnly: true,
      sameSite: "none"
    }
  })
);

// ✅ Match your frontend calls
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
