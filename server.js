const express = require("express")
const socket=  require("socket.io");

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

usersConnected = []
games = []

io.on("connection", function(socket){
    socket.on('hello', (data)=>{
        console.log(`Connection From ${data[0]}`)
        socket.emit("?hello", [data])
        usersConnected.push(data[0])
        console.log(usersConnected)
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
        console.log(games)
    })

    socket.on("getDetails", (data) => {
        console.log(data)
        return data[0]
    })

    socket.on("joinGame", (data) => {
        console.log(games)
        console.log(games.find(game => game.id = data[0]))
    })
    socket.on("disconnectingEvent", (data)=>{
        console.log("disconnection")
        usersConnected = usersConnected.filter(e=>e!==data[0])
        console.log(usersConnected)
    })
})