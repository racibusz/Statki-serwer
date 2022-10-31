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

games = [
]

io.on("connection", function(socket){
    socket.on('hello', (data)=>{
        socket.emit("?hello", [data])
    })
    socket.on("getGames", (data)=>{
        socket.emit("?getGames", games)
    })
    socket.on("createGame", (data)=>{
        if(data[0].length <=5){
            return;
        }
        let game = new Game(games.length+1, new Player(data[0]))
        // Data[0] == nazwa Hosta
        games.push(game)
    })
    socket.on("joinGame", (data) => {
        console.log(games)
        console.log(games.find(game => game.id = data[0]))
    })
    socket.on("disconnect", ()=>{
        console.clear()
        console.log("disconnection")
    })
})