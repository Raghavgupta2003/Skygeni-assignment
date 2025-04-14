import axios from 'axios'; // Import axios to handle HTTP requests

// Async function to fetch pipeline data from the backend API
export const fetchPipelineData = async () => {
  try {
    // Make a GET request to the pipeline data endpoint
    const response = await axios.get(`https://skygeni-assignment-jok3.onrender.com/api/pipeline-data`);
    
    // Return the data from the response object
    return response.data;
  } catch (error) {
    // Handle any potential errors (like network issues or API errors)
    console.error('Error fetching pipeline data:', error);
    throw error; // Rethrow the error so it can be caught by the calling function
  }
};
