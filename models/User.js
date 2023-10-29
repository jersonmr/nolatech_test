import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";
import { generateId } from "../helpers/tokens.js";

const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email_verified_at: DataTypes.DATE,
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: DataTypes.STRING,
}, {
    hooks: {
        beforeCreate: async function (user) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            user.token = generateId();
        }
    }
});

export default User;
