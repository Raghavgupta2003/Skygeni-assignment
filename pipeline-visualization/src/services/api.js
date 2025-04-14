import axios from 'axios';

export const fetchPipelineData = async () => {
  const response = await axios.get('http://localhost:5000/api/pipeline-data');
  return response.data;
};
