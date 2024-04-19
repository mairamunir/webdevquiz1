const Users = require("../models/User");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/ingredient");
var express = require("express");
var router = express.Router();

router.put("/addIngredient", async (req, res)=>{
    try{
        const ingredient =  await Ingredient.findOne({name: req.body.name})
        if (ingredient) return res.json({msg : "Ingredient exists"})
        let checkING = /^[a-zA-Z]+$/
        if(!checkING.test(req.body.name)){
return res.json({msg: "Ingredient name needs to be in letters."})
        }
        await Ingredient.create({...req.body})
        res.json({msg: "Ingredient ADDED"})
      }
      catch (error) {
        console.error(error)
    }
});

module.exports = router