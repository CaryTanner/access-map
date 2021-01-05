const rateLimit = require('express-rate-limit');


const limiter = rateLimit({
  max: 15,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP. Please try again in an hour.'
});

export default limiter