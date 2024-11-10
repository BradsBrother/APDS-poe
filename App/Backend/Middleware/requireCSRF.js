const csrf = require('csurf');

const csrfProtection = csrf({ cookie: true }); // Configure CSRF protection

const requireCsrf = (req, res, next) => {
  
    const exemptRoutes = ['/api/User/login', '/api/User/signup'];

   
    if (exemptRoutes.includes(req.path)) {
        return next(); 
    }

    csrfProtection(req, res, next); 
};

 module.exports = {
    requireCsrf,
    csrfProtection,
 }