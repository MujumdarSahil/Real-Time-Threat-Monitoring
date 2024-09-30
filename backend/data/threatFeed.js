const axios = require('axios');

async function fetchThreatData() {
    try {
        const response = await axios.get('https://api.threatfeeds.com/sample');  // Replace with actual threat feed API
        return response.data; // Assuming data contains the feed in the required format
    } catch (error) {
        console.error("Error fetching threat data", error);
        return [];
    }
}

module.exports = fetchThreatData;
