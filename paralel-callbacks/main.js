const express = require('express');
const app = express();
const port = 4000;

const request = require('request');

// Function to work with one server
function fetchDataFromServer(serverNumber, callback) {
    const url = `http://localhost:300${serverNumber}/data`;

    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            callback(null, data);
        } else {
            callback(error, null);
        }
    });
}

app.get('/fetch', (req, res) => {
    // Fetch data from both servers in parallel
    let result1, result2;

    fetchDataFromServer(1, (error, data) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching data from server 1' });
            return;
        }
        result1 = data;

        // Check if we have received responses from both servers
        if (result1 && result2) {
            res.json({ result1, result2 });
        }
    });

    fetchDataFromServer(2, (error, data) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching data from server 2' });
            return;
        }
        result2 = data;

        // Check if we have received responses from both servers
        if (result1 && result2) {
            res.json({ result1, result2 });
        }
    });
});

app.listen(port, () => {
    console.log('Main server is running on port', port);
});
