const express = require('express')

const Log = require("../helper/Log")

const router = express.Router();

// used when compiling the routes in the MainAPiConnector
router["custom"] = {}
router.custom["parent_path"] = "/admin"

router.get('/ping',async (req, res, next) => {
    try{
        res.json({mesage:"admin pong", status:200})

    }catch(e){
        Log.error(e.toString())
        res.json({message: e.toString(), status:500})
    }
});

router.post('/addUser',async (req, res, next) => {
    try{
        console.log(req.body)
        res.json({data: req.body.name += " war hier", status:200})

    }catch(e){
        Log.error(e.toString())
        res.json({message: e.toString(), status:500})
    }
});

module.exports = router;