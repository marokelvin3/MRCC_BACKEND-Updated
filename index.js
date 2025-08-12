const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Support WebApp API" }));

app.use("/auth", require("./auth"));
app.use("/tickets", require("./tickets"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
