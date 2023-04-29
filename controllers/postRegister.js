const User = require("../models/user");
const bcrypt = require("bcryptjs");

const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check if user exist in db
    const userExists = await User.exists({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(409).send("Email already in use");
    }

    //storing encrypted password in database
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      encryptedPassword,
    });

    //get jwt token
    const token = "JWT TOKEN";
    res.status(201).json({
      userDetails: {
        email: user.email,
        token: token,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).send("Error occured. Please try again");
  }
};
module.exports = postRegister;
