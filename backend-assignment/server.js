// Import necessary modules
const express = require('express');
const fs = require('fs'); // For reading data.json file
const cors = require('cors'); // To enable Cross-Origin Resource Sharing
const { processPipelineData } = require('./utils/processData'); // Function to process the raw data

const app = express(); // Initialize Express app
const PORT = 5000; // Define port number for backend server

app.use(cors()); // Enable CORS for all incoming requests

// Define API endpoint to serve processed pipeline data
app.get('/api/pipeline-data', (req, res) => {
  // Read the data.json file asynchronously
  fs.readFile('./data.json', 'utf8', (err, jsonData) => {
    if (err) {
      // If reading file fails, return a 500 error response
      return res.status(500).json({ error: 'Failed to read data' });
    }

    // Parse the JSON data into a JavaScript object
    const rawData = JSON.parse(jsonData);

    // Process the raw data using custom logic from processPipelineData
    const processedData = processPipelineData(rawData);

    // Send the processed data as JSON response
    res.json(processedData);
  });
});

// Start the Express server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
