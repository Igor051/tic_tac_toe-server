let express = require('express');
const apiRouter = require("./api.router.js")
let app = express();
const path = require("path")
const {runDB} = require("./service/index.js")
const urlencodedParser = express.urlencoded({extended: false});
app.use(urlencodedParser)
app.use(express.json())
app.use(express.static(path.join(process.cwd(), "public")))


let cors = require('cors')
app.use(cors({
    origin: true,
    credentials: true
}));


app.use('/', apiRouter)

async function run() {
    await runDB()
    app.listen(5000, () => {
        console.log("run");
    })
}

const http = require("http");
let server = http.createServer(app)
const socketio = require("socket.io")
const io = socketio(server, {cors: {origin: '*'}})
io.listen(8080)

class gameField {
    constructor() {
        this.room_name = ""
        this.player1 = ""
        this.player2 = ""
        this.turn = "-"
        this.Field = {
            cell_1_1: 0,
            cell_1_2: 0,
            cell_1_3: 0,
            cell_2_1: 0,
            cell_2_2: 0,
            cell_2_3: 0,
            cell_3_1: 0,
            cell_3_2: 0,
            cell_3_3: 0
        }
    }
}

const active_games = {}

io.on("connection", socket => {
    let gamefield = new gameField()
    socket.on("game_request", ({user_id, nickname, sender_id}) => {
        gamefield.player1 = sender_id
        gamefield.player2 = user_id
        gamefield.turn = sender_id
        const room_name = `room:${user_id}`
        gamefield.room_name = room_name
        active_games[room_name] = gamefield

        socket.broadcast.emit(`${user_id}`, nickname)
        socket.join(room_name)
        console.log(room_name);
    })

    socket.on("game_request_accept", (user_id) => {
        const room_name = `room:${user_id}`
        socket.join(room_name)
        io.to(room_name).emit("Game started", {turn: active_games[room_name].turn, room_name})
    })

    socket.on("click", ({coordinates, room_name, _id}) => {
        console.log(room_name, "here");
        io.to(room_name).emit("click", {coordinates, _id})
    })

});


run()



