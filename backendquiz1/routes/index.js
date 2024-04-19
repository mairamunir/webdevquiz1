const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")

const authRouter = require("./auth");
const recipeRouter = require("./recipe");
const ingredientRouter = require("./ingredients");
router.use("/auth", authRouter);
router.use("/recipe", recipeRouter);
router.use("/ingredients", ingredientRouter);
//authentication doesnt need jwt hence before that middleware
//middleware (all functions after this require the jwt token)
router.use(async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = jwt.verify(token.split(" ")[1], "SECRET")
        req.user = user;
        next()
    } catch (e) {
        return res.json({ msg: "TOKEN NOT FOUND/ INVALID"})
    }
})
module.exports = router;