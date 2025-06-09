const express = require('express');
const app = express();
const routes = require('./api/api');
app.use(express.json());
app.use('/api', routes);

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server běží na http://localhost:3000');
});













