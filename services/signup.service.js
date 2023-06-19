const signUp = require("../models/signup.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//SignUp API

module.exports.signUp = async (req, res) => {
  const data = await signUp
    .find({ email: req.body.email })
    .then(async (data) => {
      console.log(data);
      if (data.length > 0) {
        res.json("email is already exist");
      } else {
        const fname = req.body.first_name;
        const lname = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password;
        const sign = await signUp.create({
          first_name: fname,
          last_name: lname,
          email: email,
          password: password,
        });
        console.log(sign);
        res.json(sign);
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

//Login API

module.exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await signUp.findOne({ email: email });
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      const token = jwt.sign({ user }, process.env.SECRET_KEY);
      if (!validPassword) {
        res.status(422).send("Login Failed..");
      } else {
        const data = { user, token };
        res.status(200).send(data);
      }
    } else {
      res.status(422).send("Email Not Valid");
    }
  } catch (err) {
    res.status(422).send(err);
  }
};
