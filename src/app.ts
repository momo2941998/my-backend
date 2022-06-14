import App from "./MyApp";
import dotenv from 'dotenv'
import Websocket from 'ws'
import { attachOnMessage, initPacketAcc, initPacketHi, sendWS } from "./tinode/utils";
import { verifyToken } from "./utils/jwtUtils";
dotenv.config()
let http_port = parseInt(process.env.HTTP_PORT || "80000")

const app = new App(http_port)
const ws = new Websocket("ws://localhost:6060/v0/channels?apikey=AQEAAAABAAD_rAp4DJh05a1HAwFT3A6K")
ws.on('open', function open() {
  console.log('open socket')
  attachOnMessage(ws)
  const hiMsg = initPacketHi()
  sendWS(ws, hiMsg, hiMsg.hi.id).then(info => console.log("server info", info))
  const accMsg = initPacketAcc({
    username: 'kien12346',
    password: '123456',
    email: 'test@123.ss',
    fullname: 'kien'
  })
  sendWS(ws, accMsg, accMsg.acc.id).then(()=> {
    console.log("success add user")
  }).catch(err => {
    console.error("fail", err)
  })
});

verifyToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6Ik1PQklGT05FIn0.eyJqdGkiOiIzMDhiNGE0NC05ODA1LTRjMjItOWZkZS03MTk3MTNkZWQ0NjctMTY1NTE3OTQwOCIsImlzcyI6IjMwOGI0YTQ0LTk4MDUtNGMyMi05ZmRlLTcxOTcxM2RlZDQ2NyIsImV4cCI6MTY1NTI2NTgwOCwidXNlcklkIjoiMTExIn0.FK_W8kyzM8YbQ9lp7U7T1miSdAEqngsHoKFx1N-NfsI")
app.listen()