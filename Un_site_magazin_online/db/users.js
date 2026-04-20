const bcrypt = require('bcrypt');

let users = [
  // exemplu user initial (optional)
  // {
  //   id: 1,
  //   email: 'test@example.com',
  //   name: 'Test User',
  //   passwordHash: '...'
  // }
];

let nextId = 1;

async function createUser({ email, name, password }) {
  const existing = users.find(u => u.email === email);
  if (existing) {
    throw new Error('Email deja folosit');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: nextId++, email, name, passwordHash };
  users.push(user);
  return user;
}

function findByEmail(email) {
  return users.find(u => u.email === email);
}

module.exports = {
  createUser,
  findByEmail
};
