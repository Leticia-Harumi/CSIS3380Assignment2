const axios = require('axios');
const fs = require('fs');

// API URL
const apiUrl = 'https://randomuser.me/api/?results=30'; // Change the number of results as needed

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data.results;

    // Save the data to a JSON file
    const jsonData = JSON.stringify(data, null, 2); // Pretty-print with 2 spaces
    fs.writeFileSync('data.json', jsonData);

    console.log('Data saved to data.json');
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

// Call the fetchData function
fetchData();