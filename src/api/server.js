require('dotenv').config();

const { join } = require('path');

const express = require('express');

const databaseConfig = require('../config/database.config');

const paymentsRouter = require('./routes/payments.routes');

const app = express();

databaseConfig
    .authenticate()
    .then(() => console.log(`Connected to database ${databaseConfig.getDatabaseName()}!`))
    .catch(console.error);

app.set('port', process.env.PORT || process.env.SERVER_PORT || 3000);
app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));

app.use(express.json());

app.use('/payments', paymentsRouter);

app.listen(app.get('port'), () => console.log(`Serving at Port ${app.get('port')}!`));
