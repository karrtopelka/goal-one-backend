const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class Slut {
  constructor(name, price, img) {
    this.name = name;
    this.price = price;
    this.img = img;
    this.id = uuidv4();
  }

  toObject() {
    return { name: this.name, price: this.price, img: this.img, id: this.id };
  }

  static async update(slut) {
    const sluts = await Slut.getAll();
    const idx = sluts.findIndex((s) => s.id === slut.id);
    sluts[idx] = slut;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'sluts.json'),
        JSON.stringify(sluts),
        (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        },
      );
    });
  }

  async save() {
    const sluts = await Slut.getAll();
    sluts.push(this.toObject());
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'sluts.json'),
        JSON.stringify(sluts),
        (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        },
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, '..', 'data', 'sluts.json'), 'utf-8', (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(JSON.parse(data));
      });
    });
  }

  static async getById(id) {
    const sluts = await Slut.getAll();
    return sluts.find((s) => s.id === id);
  }
}

module.exports = Slut;
