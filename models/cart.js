const path = require('path');
const fs = require('fs');

const p = path.join(require.main.filename, '..', 'data', 'cart.json');

class Cart {
  static async add(slut) {
    const cart = await Cart.fetch();
    const idx = cart.sluts.findIndex((c) => c.id === slut.id);
    const candidate = cart.sluts[idx];
    if (candidate) {
      candidate.count++;
      cart.sluts[idx] = candidate;
    } else {
      slut.count = 1;
      cart.sluts.push(slut);
    }

    cart.price += +slut.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(data));
      });
    });
  }

  static async remove(id) {
    const cart = await Cart.fetch();
    const idx = cart.sluts.findIndex((s) => s.id === id);
    const slut = cart.sluts[idx];

    if (slut.count === 1) {
      cart.sluts.splice(idx, 1);
    } else {
      cart.sluts[idx].count--;
    }

    cart.price -= slut.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          return reject(err);
        }
        resolve(cart);
      });
    });
  }
}

module.exports = Cart;
