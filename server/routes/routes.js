const UserController = require("../controllers/user-controller");

const router = require("express").Router();
const axios = require("axios");
const authentication = require("../middlewares/authentication");
const MarvelController = require("../controllers/marvel-controller");
const multer = require("multer");
const MidtransController = require("../controllers/midtrans");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/google-auth", UserController.googleLogin)

router.use(authentication);
router.post('/midtrans/user/payment', MidtransController.getMidtransToken)
router.patch('/user/upgrade', UserController.upgradeAccount)
router.get("/profile", UserController.getUserById);
router.put("/profile", UserController.editAccount);
router.patch("/profile", upload.single("imgUrl"), UserController.editProfilPicture);
router.delete("/acc-delete", UserController.deleteAccount);
router.get("/characters", MarvelController.getCharacter);
router.get("/characters/:id", MarvelController.getCharacterById)

module.exports = router;
