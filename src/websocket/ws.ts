import Websocket from 'ws'
import { MyError } from '../tinode/MyError';
import { attachOnMessage, initLoginBasic, initPacketAcc, initPacketHi, NewUserInfo, sendWS } from "../tinode/utils";



export const openConnect: () => Promise<Websocket> = () => {
  return new Promise((resolve, reject) => {
    const ws = new Websocket("ws://localhost:6060/v0/channels?apikey=AQEAAAABAAD_rAp4DJh05a1HAwFT3A6K")
    ws.onopen = function () {
      console.log('open socket')
      attachOnMessage(ws)
      resolve(ws);
    };
    ws.onerror = function(err) {
        reject(err);
    };
  })
  
}

export const newAcc = (ws: Websocket, user: NewUserInfo) => {
  const accMsg = initPacketAcc(user)
  return sendWS(ws, accMsg, accMsg.acc.id)
}

export const loginBasic = (ws: Websocket ,user: Pick<NewUserInfo, 'username'|'password'>) => {
  const loginMsg = initLoginBasic(user)
  return sendWS(ws, loginMsg, loginMsg.login.id)
}