const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}; 

const getId = () => {
  let id = getId.base;
  for (let i = 0; i < 16; i++) {
    id += sample(getId.characters);
  }
  if (getId.used.has(id)) {
    return getId();
  } else {
    getId.used.add(id);
    return id;
  }
};

getId.characters = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                    'abcdefghijklmnopqrstuvwxyz' +
                    '0123456789-_').split('');
getId.used = new Set();
getId.base = '';

module.exports = getId;
