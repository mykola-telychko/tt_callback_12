const express = require('express');
const app = express();
const port = 3002;

app.get('/data', (req, res) => {
    setTimeout(() => {
        res.json({ server: 2, message: 'Data from server 2' });
    }, 2000);
});

app.listen(port, () => {
    console.log('Server 2 is running on port', port);
});
