const express = require('express');
const app = express();
const PORT = 3001; // process.env.PORT

app.get('/', (req, res) => {
    res.send('Backend is working :))!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});