let express = require('express')
let app = express()
let http = require('http')
let server = http.createServer(app)

let {Server} = require('socket.io')
let io = new Server(server)

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/index2", (req, res)=>{
    res.sendFile(__dirname+"/index2.html")
})

io.on("connection", (socket)=>{
    console.log("a user connected!")

    socket.on("disconnect", ()=>{
        console.log("a user disconnected!")
    })

    socket.on("index message", (message)=>{
        console.log(message)
        io.emit("index message", message)
    })

    socket.on("index2 message", (message)=>{
        console.log(message)
        io.emit("index2 message", message)
    })
})

server.listen(5000, ()=>{
    console.log("Listening on 5000")
})
