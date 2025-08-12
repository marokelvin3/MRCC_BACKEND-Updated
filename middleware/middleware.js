function isAuthenticated(req, res, next) {
  // Session sets userId (and username) on successful login.
  if (req.session && (req.session.userId || req.session.username)) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

module.exports = { isAuthenticated };
