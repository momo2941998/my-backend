import App from "./MyApp";
import dotenv from 'dotenv'
import Websocket from 'ws'
import { attachOnMessage, initPacketAcc, initPacketHi, sendWS } from "./tinode/utils";
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


app.listen()