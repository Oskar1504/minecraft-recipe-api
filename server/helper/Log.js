const fs = require('fs')

// https://stackoverflow.com/a/41407246
const Colors = {
    Black : "\x1b[30m",
    Red : "\x1b[31m",
    Green : "\x1b[1;32m",
    Yellow : "\x1b[33m",
    Blue : "\x1b[34m",
    Magenta : "\x1b[35m",
    Cyan : "\x1b[36m",
    LightCyan : "\x1b[1;36m",
    LightMagenta : "\x1b[1;35m",
    White : "\x1b[37m"
}

let Log = {
    log: function (content, type = "", color) {
        let msg = ""
        color ? msg += Colors[color] : null

        msg += `[${new Date().toLocaleTimeString()}] ${type} `

        content ? msg += content : null

        msg += "\x1b[0m"
        console.log(msg)
        return this
    },
    error: function (content, type = "ERROR", color = "Red") {
        let msg = ""
        msg += Colors[color]
        msg += `[${new Date().toLocaleTimeString()}] ${type} `

        content ? msg += content : null

        msg += "\x1b[0m"
        console.log(msg)
        return this
    },
    success: function (content, type = "SUCCESS", color = "Green") {
        let msg = ""
        msg += Colors[color]
        msg += `[${new Date().toLocaleTimeString()}] ${type} `

        content ? msg += content : null

        msg += "\x1b[0m"
        console.log(msg)
        return this
    },
    info: function (content, type = "INFO", color = "Cyan") {
        let msg = ""
        msg += Colors[color]
        msg += `[${new Date().toLocaleTimeString()}] ${type} `

        content ? msg += content : null

        msg += "\x1b[0m"
        console.log(msg)
        return this
    },
    request: function (content, type = "REQUEST", color = "LightCyan") {
        let msg = ""
        msg += Colors[color]
        msg += `[${new Date().toLocaleTimeString()}] ${type} `

        content ? msg += content : null

        msg += "\x1b[0m"
        console.log(msg)
        return this
    },
    saveError: function (content,path) {
        let logFile = []
        try{
            logFile = JSON.parse(fs.readFileSync("./server/logs/error.json"))
        }catch (e) {}
        logFile.push({timestamp:new Date().toLocaleTimeString(),content:content.toString(),path:path})
        try{
            fs.writeFileSync("./server/logs/error.json", JSON.stringify(logFile, null, 2))
        }catch (e) {
            Log.error(e.toString())
        }
        Log.error("Saved:" + content)
    }
}

module.exports = Log;
