const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// CORS setup — allow Netlify frontend
app.use(cors({
    origin: "https://lighthearted-crisp-76ee3c.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Support WebApp API" }));

// Routes
app.use("/auth", require("./auth"));
app.use("/tickets", require("./tickets"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
