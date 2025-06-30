const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"));

app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/responses", require("./routes/responseRoutes"));

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));