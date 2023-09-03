exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated('local')) {
    next();
  } else {
    res.status(401).send('log in required');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated('local')) {
    next();
  } else {
    res.status(401).send('only can access un logged in user');
  }
};
