const express = require('express');
const path = require('path');
const apiRouter = require('./api/api');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/items', apiRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});













