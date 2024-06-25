const USERS = require("../Models/user.js");
//Middleware function to create an User
const createUser = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    age,
    address,
    phone,
    createdAt,
    lastLogin,
  } = req.body;
  //Email Validation
  const mail = validateEmail(email);
  if (!mail) return res.status(406).send("Duplicate Email");
  //Details Validation
  let details = validateDetails({ firstName, lastName });
  if (details) return res.send(details);
  details = validateDetails({ email });
  if (details) return res.send(details);
  details = validateDetails({ phone, age });
  if (details) return res.send(details);
  details = validateDetails({ email, address });
  if (details) return res.send(details);
  details = validateDetails({ createdAt, lastLogin });
  if (details) return res.send(details);
  //Generating the ID if all the details are validated
  const id = generateId();
  //Creating the User
  USERS.push({ id, ...req.body });
  console.log(USERS);
  res.status(201).send("User Created!");
};
//Function to check if the email already exists or not in the database
const validateEmail = (email) => {
  let isEmailUnique = true;
  USERS.forEach((user) => {
    if (user.email === email) {
      isEmailUnique = false;
    }
  });
  return isEmailUnique;
};
//Function to check if all the details are entered or not
const validateDetails = ({ ...user }) => {
  // console.log(user);
  let abc = "";
  Object.keys(user).forEach((key) => {
    if (!user[key]) {
      abc = `${key} is missing`;
      return;
    }
  });
  return abc;
};
//Function to generate the ID for the User
const generateId = () => USERS.length + 1;

//Middleware function to get all the users in the database
const getAllUsers = (req, res, next) => {
  res.send(USERS);
};
module.exports = {
  createUser,
  getAllUsers,
};
