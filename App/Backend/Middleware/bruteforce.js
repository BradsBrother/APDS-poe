const ExpressBrute = require('express-brute');

// express-brute
const store = new ExpressBrute.MemoryStore(); 
const bruteforce = new ExpressBrute(store, {
  freeRetries: 5,             // 5 attempts before blocking the user
  minWait: 5 * 60 * 1000,     // 5 minutes wait after limit has been reached
  maxWait: 60 * 60 * 1000,    // 1-hour lock 
  lifetime: 24 * 60 * 60,     // Track for 1 day
});

module.exports = bruteforce