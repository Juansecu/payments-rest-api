require('dotenv').config();

const express = require('express');

const app = express();

app.set('port', process.env.PORT || process.env.SERVER_PORT || 3000);

app.listen(app.get('port'), () =>
    console.log(`Serving at Port ${app.get('port')}!`)
);
