const { exec } = require("child_process");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS for the extension
app.use(cors());
app.use(express.json());

// Endpoint to run Selenium
app.post("/run-selenium", (req, res) => {
  const { email, password, targetUrl } = req.body;

  if (!email || !password || !targetUrl) {
    return res.status(400).send("Email, password, and target URL are required.");
  }

  // Run the Selenium script
  const pythonPath = "/Users/undefinedboy/miniconda3/bin/python";
  exec(
    `${pythonPath} selenium_workday.py "${email}" "${password}" "${targetUrl}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Selenium: ${error.message}`);
        return res.status(500).send(`Error: ${error.message}`);
      }
      if (stderr) {
        console.error(`Selenium error output: ${stderr}`);
        return res.status(500).send(`Error: ${stderr}`);
      }

      console.log(`Selenium script output: ${stdout}`);
      res.send(`Success: ${stdout.trim()}`);
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
