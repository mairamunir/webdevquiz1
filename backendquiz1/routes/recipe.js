const Users = require("../models/User");
const Recipe = require("../models/Recipe");
var express = require("express");
var router = express.Router();

router.get("/getAll", async(req,res)=>{
    try {
        const allRecipe = await Recipe.find();
        if (allRecipe.length === 0) {
            return res.json({ msg: "NO RECIPES FOUND" });
        }
        res.json({ msg: "RECIPES FOUND", data: allRecipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
})

router.put("/addRecipe", async (req, res)=>{
    try{
        const recipe =  await Recipe.findOne({name: req.body.name})
        if (recipe) return res.json({msg : "Recipe exists"})
        let checkRecipe = /^[a-zA-Z]+$/
        if(!checkRecipe.test(req.body.name)){
return res.json({msg: "Recipe name needs to be in letters."})
        }
        await Recipe.create({...req.body})
        res.json({msg: "RECIPE ADDED"})
      }
      catch (error) {
        console.error(error)
    }
});

module.exports = router