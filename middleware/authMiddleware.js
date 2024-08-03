const User = require('../models/userModel');

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.status(401).send('You are not authenticated');
  }
};

// Middleware to check if the user has an admin role
const isAdmin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  } else {
    res.status(403).send('You do not have permission to access this resource');
  }
};

module.exports = { isAuthenticated, isAdmin };
