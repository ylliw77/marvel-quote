"use strict";
const { Model } = require("sequelize");
const {hashPassword} = require('../helpers/bcrypt-helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          notNull: {
            msg: "Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : {
          msg : "Email already in use"
        },
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      password: {
        
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password is required",
          },
          len : {
            args : [5],
            msg : "Min. 5 characters"
          }
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len : {
            args : [10, 12],
            msg : "Phone number require 10-12 characters"
          },
          isNumeric : {
            msg : "Phone number must be include with number only"
          }
        }},
      profilPicture: DataTypes.STRING,
      address: DataTypes.STRING,
      isSubcribed: {
        type  : DataTypes.STRING
      },
      
    },
    {
      sequelize,
      hooks : {
       async beforeCreate(user, ops){
          const hashedPassword = await hashPassword(user.password)
          user.password = hashedPassword
        }
      },
      modelName: "User",
    }
  );
  return User;
};
