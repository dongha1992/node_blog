const { AUTH_TOKEN_SALT } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserService } = require("../services");
const { errorGenerator, errorWrapper } = require("../errors");
// Controller 는 오직 Service 레이어에만 의존합니다.

const signUp = errorWrapper(async (req, res) => {
  const { email, password: noneHashedPassword } = req.body;

  if (!email || !noneHashedPassword) {
    errorGenerator({ message: "invalid input", statusCode: 400 });
  }

  const hashedPassword = await bcrypt.hash(noneHashedPassword, 1);

  const createUser = await UserService.createUser({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ email: createUser.email });
  res.json({
    message: "success",
  });
});

const signIn = errorWrapper(async (req, res) => {
  const { email, password: noneHashedPassword } = req.body;

  const foundUser = await UserService.findUser({ id });

  if (!foundUser) {
    errorGenerator({ message: "Not found", statusCode: 400 });
  }

  const { id, password: hashedPassword } = foundUser;

  const isValidPassword = await bcrypt.compare(
    noneHashedPassword,
    hashedPassword
  );

  if (!isValidPassword) {
    errorGenerator({ message: "Not found", statusCode: 400 });
  }

  const token = jwt.sign({ id }, AUTH_TOKEN_SALT, {
    expiresIn: "1hr",
  });

  res.status(200).json({ token });
});

module.exports = {
  signUp,
  signIn,
};
