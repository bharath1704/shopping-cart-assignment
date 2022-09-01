const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.resolve(__dirname, '../build')));
app.use('/static', express.static(path.resolve(__dirname, '../static')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.get('/banners', (req, res) => {
  res.sendFile(path.resolve(__dirname, './banners/index.get.json'), (err) => {
    if (err) {
      next(err);
    }
    else {
      console.log('banners response sent');
    }
  });
});

app.get('/categories', (req, res) => {
  res.sendFile(path.resolve(__dirname, './categories/index.get.json'), (err) => {
    if (err) {
      next(err);
    }
    else {
      console.log('categories response sent');
    }
  });
});

app.get('/products', (req, res) => {
  res.sendFile(path.resolve(__dirname, './products/index.get.json'), (err) => {
    if (err) {
      next(err);
    }
    else {
      console.log('products response sent');
    }
  });
});

app.post('/add-to-cart', (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.resolve(__dirname, './addToCart/index.post.json'), (err) => {
    if (err) {
      next(err);
    }
    else {
      console.log('addToCart status response sent');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
