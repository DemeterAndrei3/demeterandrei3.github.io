module.exports = function logger(req, res, next) {
  const user = req.session && req.session.user ? req.session.user.email : 'anonim';
  console.log(`${req.method} ${req.originalUrl} - user: ${user}`);
  next();
};
