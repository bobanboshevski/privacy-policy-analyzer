const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001; // process.env.PORT

app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://privacy-policy-analyzer-xi.vercel.app'
    ]
}));

app.get('/', (req, res) => {
    res.send('Backend is working :))!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});