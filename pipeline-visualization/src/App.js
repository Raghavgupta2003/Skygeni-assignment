// import React, { useEffect, useState } from 'react';
// import { fetchPipelineData } from './services/api';
// import Chart from './components/Chart';
// import TableStage from './components/TableStage';
// import './App.css';

// function App() {
//   const [data, setData] = useState({ stageByCount: [], stageByACV: [] });

//   useEffect(() => {
//     fetchPipelineData().then(setData);
//   }, []);

//   return (
//     <div className="App" style={{ padding: '1rem' }}>
//       <div className="grid">
//         <div>
//           <Chart data={data.stageByCount} title="Win Rate by opportunity count" />
//         </div>
//         <div>
//           <Chart data={data.stageByACV} title="Win Rate by ACV" />
//         </div>
//       </div>

//       <div className="grid">
//         <div>
//           <TableStage data={data.stageByCount} title="Opportunity Count Table" />
//         </div>
//         <div>
//           <TableStage data={data.stageByACV} title="ACV Table" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { fetchPipelineData } from './services/api';
import Chart from './components/Chart';
import TableStage from './components/TableStage';
import './App.css';

const App = () => {
  const [data, setData] = useState({ stageByCount: [], stageByACV: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch pipeline data from the backend API
    fetchPipelineData()
      .then((responseData) => {
        setData(responseData);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError('Failed to load data.');
      });
  }, []);

  if (error) {
    return <div className="App"><h2>{error}</h2></div>;
  }

  return (
    <div className="App" style={{ padding: '1rem' }}>
      <div className="grid">
        <div>
          <Chart data={data.stageByCount} title="Win Rate by Opportunity Count" />
        </div>
        <div>
          <Chart data={data.stageByACV} title="Win Rate by ACV" />
        </div>
      </div>

      <div className="grid">
        <div>
          <TableStage data={data.stageByCount} title="Opportunity Count Table" />
        </div>
        <div>
          <TableStage data={data.stageByACV} title="ACV Table" />
        </div>
      </div>
    </div>
  );
};

export default App;
