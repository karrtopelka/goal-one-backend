const express = require('express');
const exphbs = require('express-handlebars');
const homeRoute = require('./routes/home');
const slutsRoute = require('./routes/sluts');
const addRoute = require('./routes/add');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/', homeRoute);
app.use('/sluts', slutsRoute);
app.use('/add', addRoute);

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`Server is started on port => ${PORT}`);
});
