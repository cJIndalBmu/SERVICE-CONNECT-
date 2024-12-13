const express = require("express");
const router = express.Router();
const {home,register,login, user} = require("../controllers/auth-controller");  
//const signupSchema = require("../controllers/auth-controller");
const signupSchema = require("../validators/auth-validator");
const loginSchema = require("../validators/auth-validator");
const validate = require("../middleware/validate-middleware");
const authMiddleware = require("../middleware/auth-middleware");

// router.get("/", (req,res) => {
//     res
//         .status(200)
//         .send("Welcome Agnit using ROUTER...");
// });

router.route("/").get(home);
// router.route("/register").get(register);
router.route("/register").post(validate(signupSchema), register);
//router.route("/login").post(validate(loginSchema),login);

router.route("/login").post(login);

router.route("/user").get(authMiddleware, user);

// router.route("/register").get((req,res)=>{
//     res.status(200).send("Welcome to Registration Page...");
// });

module.exports = router;