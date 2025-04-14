import React, { useEffect, useState } from 'react'; // Import necessary React hooks
import { fetchPipelineData } from './services/api'; // Import the function to fetch pipeline data
import Chart from './components/Chart'; // Import the Chart component
import TableStage from './components/TableStage'; // Import the TableStage component
import './App.css'; // Import the styles for the app

const App = () => {
  // Initialize state variables for storing data and error messages
  const [data, setData] = useState({ stageByCount: [], stageByACV: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch pipeline data when the component is mounted (only once due to empty dependency array)
    fetchPipelineData()
      .then((responseData) => {
        // If the data is successfully fetched, update the state with the fetched data
        setData(responseData);
      })
      .catch((err) => {
        // If there’s an error in fetching data, log the error and set the error state
        console.error('Error fetching data:', err);
        setError('Failed to load data.'); // Set an error message for UI display
      });
  }, []); // Empty array ensures the effect runs only once on component mount

  // If there is an error, display the error message
  if (error) {
    return <div className="App"><h2>{error}</h2></div>;
  }

  // Render the main content when the data is successfully fetched
  return (
    <div className="App" style={{ padding: '1rem' }}>
      <div className="grid">
        {/* Chart displaying win rate by opportunity count */}
        <div>
          <Chart data={data.stageByCount} title="Win Rate by Opportunity Count" />
        </div>
        {/* Chart displaying win rate by ACV */}
        <div>
          <Chart data={data.stageByACV} title="Win Rate by ACV" />
        </div>
      </div>

      <div className="grid">
        {/* Table displaying opportunity count data */}
        <div>
          <TableStage data={data.stageByCount} title="Opportunity Count Table" />
        </div>
        {/* Table displaying ACV data */}
        <div>
          <TableStage data={data.stageByACV} title="ACV Table" />
        </div>
      </div>
    </div>
  );
};

export default App;
