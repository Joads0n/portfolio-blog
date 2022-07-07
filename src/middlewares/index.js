const passport = require('passport');

module.exports = {
  local: (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error && (error.message === "E-mail ou senha inválidos" || error.message === 'Email não localizado na base de dados')) {
        return res.status(401).json({ Error: error.message });
      }
      if (error) {
        return res.status(500).json({ Error: error.message });
      }
      if (!user) {
        return res.status(401).json();
      }
      req.user = user;
      return next();
    })(req, res, next);
  },

  bearer: (req, res, next) => {
    passport.authenticate("bearer", { session: false }, (error, user, info) => {
      if (error && error.name === 'JsonwebTokenError') {
        return res.status(401).json({ Error: error.message });
      }
      if (error && error.name === 'TokenExpiredError') {
        return res.status(401).json({ Error: error.messag, ExpiradoEm: error.expiredAt });
      }
      if (error) {
        return res.status(500).json({ Error: error.message });
      }
      if (!user) {
        return res.status(401).json();
      }
      req.user = user;
      return next();
    })(req, res, next);
  }
}