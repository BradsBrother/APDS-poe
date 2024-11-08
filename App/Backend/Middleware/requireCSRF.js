const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true }); // Configure CSRF protection

const requireCsrf = (req, res, next) => {
    // List of routes that do not require CSRF protection
    const exemptRoutes = ['/api/User/login', '/api/User/signup'];

    // Check if the request path is in the exempt list
    if (exemptRoutes.includes(req.path)) {
        return next(); // Skip CSRF check for these routes
    }

    csrfProtection(req, res, next); // Apply CSRF protection for other routes
};

 module.exports = {
    requireCsrf,
    csrfProtection,
 }