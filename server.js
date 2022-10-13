const express = require("express")
const socket=  require("socket.io")

const port = 21375
const app = express();

const server = app.listen(port, function () {
    console.log("LISTENING")
})

app.use(express.static("public"))

const io = socket(server, {
    cors:{
        origin: "*"
    }
})

players = []
games = [
    {
        id: 1,
        board: [],
        hostName: "HOstName"
    }
]

io.on("connection", function(socket){
    console.log("XD")
    socket.on("setNick", (data) => {
        var id = players.length + 1;
        players.push({'id': id, 'nick': data[0]})
        socket.emit("id?", [id])
        console.log(players)
    })
    socket.on("getGames", (data)=>{
        socket.emit("?getGames", games)
    })
})