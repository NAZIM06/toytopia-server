const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT ||5000;

// middleware
app.use(cors());
app.use(express.json());


// Start the server
app.listen(port, () => {
  console.log(`Server listening by me at http://localhost:${port}`);
});