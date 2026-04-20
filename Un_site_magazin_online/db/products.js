const products = [
  { id: 1, name: 'Laptop', price: 3500, category: 'Electronics' },
  { id: 2, name: 'Casti wireless', price: 300, category: 'Electronics' },
  { id: 3, name: 'Rucsac', price: 150, category: 'Accessories' },
  { id: 4, name: 'Mouse gaming', price: 200, category: 'Electronics' }
];

function getAll() {
  return products;
}

function getById(id) {
  return products.find(p => p.id === Number(id));
}

module.exports = {
  getAll,
  getById
};
