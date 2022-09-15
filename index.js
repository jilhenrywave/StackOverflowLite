/* eslint-disable no-console */
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('StackoverflowLite Project API');
});

app.listen(process.env.PORT, () => {
  console.log('Server started...');
});
