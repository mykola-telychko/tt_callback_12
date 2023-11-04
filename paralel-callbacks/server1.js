const express = require('express');
const app = express();
const port = 3001;

app.get('/data', (req, res) => {
    setTimeout(() => {
        res.json({ server: 1, message: 'Data from server 1' });
    }, 1000); // Відповідає через 1 секунду
});

app.listen(port, () => {
    console.log('Server 1 is running on port', port);
});
