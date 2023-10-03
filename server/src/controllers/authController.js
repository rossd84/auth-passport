const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

exports.register = async (req, res) => {
  console.log('register hit')
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error in authController.register:', error)
    res.status(500).json({ error: 'Internal server error'});
  }
};

exports.login = passport.authenticate('local', {
  successRedirect: '/dashboard', // Redirect to dashboard on successful login
  failureRedirect: '/login',     // Redirect to login page on failed login
})

exports.logout = (req, res) => {
  try {
    req.logout(function(err) {
      if (err) { return next(err); }
      // res.redirect('/login');
      res.status(201).json({ message: 'User logged out successfully' });
    });
  } catch (err) {
    console.error('Error on authController/logout', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
