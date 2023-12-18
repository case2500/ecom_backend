const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const removeUser = async (req, res) => {
  console.log(req.params.id)
  try {
    // Code
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

const changeRole = async (req, res) => {
  console.log(req.body);
  try {
    // Code
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

// Update User
const updateuser = async (req, res) => {
  console.log("userid=>" + JSON.stringify(req.body));
  const { _id, name, email, phone, bio, role } = req.body;
  const user = await User.findById(req.body._id);
  if (user) {
    //  Update Product
    const updateduser = await User.findByIdAndUpdate(
      { _id: _id },
      {
        name,
        email,
        phone,
        bio,
        role,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    // res.status(200).json(updateduser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

// ******* signup ******** //
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log(req.body);
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: user });
};

// ******* login ******** //
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Signup Please" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Inavlid Email / Password" });
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  console.log("Generated Token\n", token);
  if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = "";
  }
  console.log("req.cookies\n", existingUser._id);
  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 86400), // 1d
    httpOnly: true,
    sameSite: "lax",
  });
  console.log("req.cookies\n", existingUser._id);
  console.log("req.cookies\n", existingUser._id);
  return res
    .status(200)
    .json({ message: "Successfully Logged In", user: existingUser, token });
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  console.log("cookies=>"+cookies)
  const token = cookies.split("=")[1];
  if (!token) {
    res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid TOken" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};

// ******* getUser ******** //
const getUser = async (req, res, next) => {
  console.log(req.params.id);
  const userId = req.params.id;
  // console.log(req.id)
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ messsage: "User Not FOund" });
  }
  return res.status(200).json({ user });
};

// getUserlist
const getUserlist = async (req, res, next) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (err) {
    return new Error(err);
  }
};

const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  console.log(cookies);
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "35s",
    });
    console.log("Regenerated Token\n", token);

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user.id;
    next();
  });
};

// ******* logout ******** //
const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  console.log("cook" + cookies);
  const prevToken = cookies.split("=")[1];
  console.log(prevToken);
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
exports.updateuser = updateuser;
exports.getUserlist = getUserlist;
exports.changeRole =changeRole;
exports.removeUser = removeUser;