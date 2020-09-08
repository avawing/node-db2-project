const express = require('express')
const server = express()

server.use(express.json());

const PORT = process.env.PORT || 4000
server.listen(PORT, () =>{console.log("server is running")})
