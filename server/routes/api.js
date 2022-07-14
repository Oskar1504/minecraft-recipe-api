const express = require('express')
const fs = require('fs')

const Log = require("../helper/Log")

const router = express.Router();

// used when compiling the routes in the MainAPiConnector
router["custom"] = {}
router.custom["parent_path"] = "/api"

router.get('/ping',async (req, res, next) => {
    try{
        res.json({mesage:"admin pong", status:200})

    }catch(e){
        Log.error(e.toString())
        res.json({message: e.toString(), status:500})
    }
});

router.get('/recipeList',async (req, res, next) => {
    try{
        res.json({
            data: fs.readdirSync("./server/data/minecraft/recipes/").filter(file => file.endsWith(".json")).map(a => a.replace(".json", "")),
            status:200
        })

    }catch(e){
        Log.error(e.toString())
        res.json({message: e.toString(), status:500})
    }
});



router.get('/recipe',async (req, res, next) => {
    try{
        res.json({
            data: JSON.parse(fs.readFileSync(`./server/data/minecraft/recipes/${req.query.recipe}.json`)),
            status:200
        })

    }catch(e){
        Log.error(e.toString())
        res.json({message: `'${req.query.recipe}' recipe file does not exist. Use /recipeList to get all available recipe files.`, status:500})
    }
});

module.exports = router;
