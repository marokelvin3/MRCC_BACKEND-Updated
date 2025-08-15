const express = require("express");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const path = require("path");
const cors = require("cors");

const authRoutes = require("./Routes/auth");
const ticketRoutes = require("./Routes/tickets");

const app = express();

const FRONTEND_URL = "https://lighthearted-crisp-76ee3c.netlify.app";

// ✅ CORS — must be first
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Preflight handling
app.options("*", cors({
  origin: FRONTEND_URL,
  credentials: true
}));

// ✅ Trust Render proxy for secure cookies
app.set("trust proxy", 1);

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Session config
app.use(
  session({
    store: new SQLiteStore({ db: "sessions.db", dir: __dirname }),
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,      // HTTPS only
      httpOnly: true,    // not accessible via JS
      sameSite: "none"   // needed for cross-site cookies
    }
  })
);

// ✅ Match frontend routes (with /api prefix)
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

// ✅ Render dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
