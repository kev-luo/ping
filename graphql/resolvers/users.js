const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validateRegisterInput,
  validateLoginInput,
  validateDeleteUser,
} = require("../../utils/validators");
const SECRET_KEY = process.env.SECRET_KEY;
const User = require("../../models/User");
const Ping = require("../../models/Ping");
const { UserInputError } = require("apollo-server");

const checkAuth = require("../../utils/check-auth");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find({})
          .populate("pings")
          .populate("seenPings")
          .sort({ username: 1 });
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUser(_, { userId }, context) {
      const user = checkAuth(context);

      if (!user) {
        return "please log in or sign up to view this user";
      }

      try {
        const lookAtUser = await User.findById(userId).populate("pings");
        if (lookAtUser) {
          return lookAtUser;
        } else {
          throw new Error("user not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("wrong credentials", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "user not found";
        throw new UserInputError("user not found", {
          errors: {
            username: "User not found",
          },
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "wrong credentials";
        throw new UserInputError("wrong credentials", {
          errors: {
            password: "Incorrect password",
          },
        });
      }

      const token = generateToken(user);
      console.log("THIS IS WHAT YOUR LOOKING FOR",user, user._doc)
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("errors", { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      const userEmail = await User.findOne({ email });
      if (userEmail) {
        throw new UserInputError("email is taken", {
          errors: {
            email: "This email is taken",
          },
        });
      }

      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        imageUrl: null
      });
      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async updateUser(_, { imageUrl }, context) {
      console.log("update user");
      const user = checkAuth(context);
      console.log(user);

      const updatedUser = await User.findOneAndUpdate(
          {_id: user.id},
          { imageUrl: imageUrl },
          { new: true }
      )

      return updatedUser;
    },
    async deleteUser(_, { password }, context) {
      console.log("delete user");
      const user = checkAuth(context);
      const userDeep = await User.findById(user.id);
      console.log(user, userDeep);

      const { errors, valid } = validateDeleteUser(password);
      if (!valid) {
        throw new UserInputError("password must not be blank", { errors });
      }

      const match = await bcrypt.compare(password, userDeep.password);
      if (!match) {
        errors.general = "wrong credentials";
        throw new UserInputError("wrong credentials", { errors });
      }

      if (match) {
        try {
          await Ping.deleteMany({ author: user.id});
          await User.deleteOne({ _id: user.id });
        } catch (err) {
          throw new Error(err);
        }
        return "deleted user";
      } else {
        return "You are not the user";
      }
    },
  },
};
