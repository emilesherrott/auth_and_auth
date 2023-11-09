const bcrypt = require('bcrypt');

const User = require('../models/user');

async function register(req, res) {
    try {
      const data = req.body;
  
      // Generate a salt with a specific cost
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
  
      // Hash the password
      // The 1st argument is the plain text password
      // The 2nd argument is the salt
      data["password"] = await bcrypt.hash(data.password, salt);
      // We updated the key of 'password' in our request object
  
      // Pass updated data to the model to create a new user
      const result = await User.create(data);
  
      res.status(201).send(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async function login(req, res) {
    const data = req.body;
    try {
      const user = await User.getOneByUsername(data.username);
  
      const authenticated = await bcrypt.compare(data.password, user.password);
  
      if (!authenticated) {
        throw new Error("Incorrect credentials.");
      } else {
        res.status(200).json({ authenticated: true });
      }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }

module.exports = {
    register, login
}                           