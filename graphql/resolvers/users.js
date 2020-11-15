const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validateRegisterInput, valudateLoginInput } = require("../../utils/validators");
const SECRET_KEY = process.env.SECRET_KEY;
const User = require("../../models/User");
const { UserInputError } = require("apollo-server");

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        SECRET_KEY,
        { expiresIn: "1h"}
    );
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);

            if(!valid) {
                throw new UserInputError("wrong credentials", { errors });
            }

            const user = await User.findOne({ username });
            if(!user){
                errors.general = "user not found";
                throw new UserInputError("user not found", { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                errors.general = "wrong credentials";
                throw new UserInputError("wrong credentials", { errors })
            }

            const token = generateToken(user);
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
    }
}