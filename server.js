const express = require("express")
const socket=  require("socket.io")

const port = 21374
const app = express();


const {Game,Player} = require("./game");


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
]

io.on("connection", function(socket){
    socket.on('hello', (data)=>{
        console.log("connected: ", data[0])
    })
    socket.on("getGames", (data)=>{
        socket.emit("?getGames", games)
    })
    socket.on("createGame", (data)=>{
        let game = new Game(games.length+1)
        games.push(game)
    })
    socket.on("joinGame", (data) => {
        
    })
    socket.on("disconnect", ()=>{
        console.log("Connection stopped")
    })
})