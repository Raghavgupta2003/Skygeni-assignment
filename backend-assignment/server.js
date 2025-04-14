const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { processPipelineData } = require('./utils/processData');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/pipeline-data', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, jsonData) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    const rawData = JSON.parse(jsonData);
    const processedData = processPipelineData(rawData);
    res.json(processedData);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
