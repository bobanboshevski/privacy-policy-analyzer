// Entry point for the application
const app = require('./src/app');
const config = require('./src/config/environment');


const PORT = config.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});