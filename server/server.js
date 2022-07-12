require("dotenv").config()
const express = require('express')

const Log = require("./helper/Log");
const MainApiConnector = require("./helper/MainApiConnector");

const adminRouter = require("./routes/admin")

const app = express()

app.use(express.json())

app.use(function (req, res, next) {
    Log.request(req.originalUrl)

    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers","Content-Type")
    res.header("'Content-Type', 'application/json'")
    next()
})


app.use("/admin", adminRouter)

app.get('/', async function (req, res) {
    res.json({
        status: "im alive"
    })
})

app.listen(process.env.PORT, function () {
    console.log(`${process.env.PROJECT_NAME} is running at http://localhost:${process.env.PORT}`)
    MainApiConnector.addApplication(app, process.env)
})