const { supabase } = require('../config/supabase');

/**
 * Middleware to verify the Supabase JWT sent in the Authorization header.
 * Attaches `req.user` (Supabase user object) on success.
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header.' });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Optional auth – attaches user if token present, continues either way.
 * Use for public routes that optionally show user-specific data.
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const { data: { user } } = await supabase.auth.getUser(token);
      req.user = user || null;
      req.token = token;
    } else {
      req.user = null;
    }
    next();
  } catch {
    req.user = null;
    next();
  }
};

module.exports = { authenticate, optionalAuth };
