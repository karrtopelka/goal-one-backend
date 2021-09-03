const express = require('express');
const path = require('path');
require('dotenv').config();
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const mongoose = require('mongoose');
const User = require('./models/user');

const homeRoute = require('./routes/home');
const slutsRoute = require('./routes/sluts');
const addRoute = require('./routes/add');
const cartRoute = require('./routes/cart');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('6112a59d8bebdc6d3698989e');
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
  }
});

const PORT = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.zj8jn.mongodb.net/onlysluts?retryWrites=true&w=majority`;

const start = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: 'karrtopelka@gmail.com',
        name: 'Max',
        cart: {
          items: [],
        },
      });
      await user.save();
    }
    app.listen(PORT, () => {
      console.log(`Server is started on port => ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoute);
app.use('/sluts', slutsRoute);
app.use('/add', addRoute);
app.use('/cart', cartRoute);

start();
