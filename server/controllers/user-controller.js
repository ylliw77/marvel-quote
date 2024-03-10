const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt-helper");
const { createToken, verifyToken } = require("../helpers/auth-helper");
const { v2: cloudinary } = require("cloudinary");
const { CLOUDINARY_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } =
  process.env;
const { OAuth2Client } = require("google-auth-library");


cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

class UserController {
  static async register(req, res, next) {
    const { fullName, email, password, phoneNumber, profilPicture, address } =
      req.body;
    try {
      const newUser = await User.create({
        fullName,
        email,
        password,
        phoneNumber,
        profilPicture,
        address,
        isSubscribed : "not subscribe"
      });
      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const findUser = await User.findOne({ where: { email } });
      if (!findUser || !comparePassword(password, findUser.password)) {
        throw { name: "USER_NOT_FOUND", message: "Invalid email/password" };
      }
      const payload = {
        id: findUser.id,
        email: findUser.email,
        isSubscribed : findUser.isSubscribed
      };

      const access_token = createToken(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    const client = new OAuth2Client();
    const token = req.headers['google-token']
    console.log(req.headers)
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const email = payload.email;
      // If request specified a G Suite domain:
      // const domain = payload['hd'];
      let user = await User.findOne({where : {email}})
      if(!user){
        user = await User.create({
          fullName : payload.name,
          email,
          password : '???' + Date.now(),
          phoneNumber : null,
          profilPicture : payload.picture,
          address : null
        }, {
          hooks : false
        })
      }
      const data = {
        id : user.id,
        email : user.email
      }
      const access_token = createToken(data)
      res.json({access_token})
    } catch (err) {
      next(err)
    }
  }
  static async getUserById(req, res, next) {
    try {
      const findUser = await User.findByPk(req.user.id);
      if (!findUser) {
        throw { name: "NOT_FOUND", message: "Data not found" };
      }

      const user = {
        fullName : findUser.fullName,
        email: findUser.email,
        profilPicture: findUser.profilPicture,
        phoneNumber: findUser.phoneNumber,
        address: findUser.address,
      };

      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async editAccount(req, res, next) {
    try {
      const { id } = req.user;
      const { fullName, email, phoneNumber, address } = req.body;
      const toEditUser = await User.update(
        { fullName, email, phoneNumber, address },
        { returning: true, where: { id } }
      );
      if (!toEditUser) {
        throw { name: "NOT_FOUND", message: "Data not found" };
      }
      res.status(200).json({
        message: "Successfully update your account",
      });
    } catch (err) {
      next(err);
    }
  }

  static async editProfilPicture(req, res, next) {
    try {
      const { id } = req.user;
      console.log(req.file);
      let updateUser = await User.findByPk(id);

      if (!updateUser) {
        throw { name: "NOT_FOUND", message: "Data not found" };
      }
      const convertBuffer = req.file.buffer.toString("base64");
      const toUpload = `data:${req.file.mimetype};base64,${convertBuffer}`;
      const uploadedFile = await cloudinary.uploader.upload(toUpload, {
        public_id: new Date().getTime(),
        folder: "i-project",
        resource_type: "auto",
      });
      await updateUser.update({ profilPicture: uploadedFile.secure_url });

      res.json({ message: `Profil Picture has been updated` });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProfilPicture(req, res, next) {
    try {
      const { id } = req.user;

      const toDeleteProfilPic = await User.update(
        { profilPicture: null },
        { where: { id } }
      );

      if (!toDeleteProfilPic) {
        throw { name: "NOT_FOUND", message: "Data not found" };
      }

      res.status(200).json({
        message: "Success removed your Profil Picture",
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteAccount(req, res, next) {
    try {
      const { id } = req.params;
      const deleteUser = await User.destroy({
        where: { id },
      });
      if (!deleteUser) {
        throw { name: "NOT_FOUND", message: "Data not found" };
      }
      res.status(200).json({
        message: "Success delete your Account",
      });
    } catch (err) {
      next(err);
    }
  }

  static async upgradeAccount(req, res, next){
    try {
      const {id} = req.user
      // untuk mengubah status dari user yang sebelumnya not subscribe => subscribe
      const toUpgradeUser = await User.update({isSubcribed : 'subcribed'}, {where : {id}})
      res.json({message : "Your account is updated"})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController;
