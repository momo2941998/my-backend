import Websocket from 'ws'
import { MyError } from './MyError'

// Resolve or reject a pending promise.
// Unresolved promises are stored in _pendingPromises.

let pendingPromises: {
  [key: string]: any
} = {}

/**
 *  Message Id per request tinode
 */
let messageId = Math.floor(Math.random() * 100000)
const userAgent = "TinodeWeb/0.18.3 (Chrome/102.0; MacIntel); tinodejs/0.18.3"
const userLang = "en-US"
const platform = "web"
const version = "0.18.3"
export interface NewUserInfo {
  username: string, 
  password: string, 
  fullname: string, 
  email: string
}

const Connection = {
  NETWORK_ERROR: 503
}

const execPromise = (id:string, code: number, onOK: any, errorText: string) => {
  const callbacks = pendingPromises[id];
  if (callbacks) {
    delete pendingPromises[id];
    if (code >= 200 && code < 400) {
      if (callbacks.resolve) {
        callbacks.resolve(onOK);
      }
    } else if (callbacks.reject) {
      callbacks.reject(new MyError(code.toString(), errorText));
    }
  }
}

// Generator of default promises for sent packets.
const makePromise = (id: string) => {
  let promise = new Promise((resolve, reject) => {
    // Stored callbacks will be called when the response packet with this Id arrives
    pendingPromises[id] = {
      'resolve': resolve,
      'reject': reject,
      'ts': new Date()
    };
  })
  return promise;
}

// Generates unique message IDs
const getNextUniqueId  = () => {
  return "" + messageId++;
}

const toBase64 = (str: string) => Buffer.from(str, 'utf8').toString('base64');

const initPacketHi = () => {
  return {
    'hi': {
      'id': getNextUniqueId(),
      "ver": version,
      "ua": userAgent,
      "lang": userLang,
      "platf": platform
    }
  };
}

const initPacketAcc = (user: NewUserInfo) => {
  return {
    'acc': {
      'id': getNextUniqueId(),
      'user': 'new',
      'scheme': 'basic',
      'secret': toBase64(`${user.username}:${user.password}`),
      'login': false,
      "desc":{"public":{"fn": user.fullname}},
      "cred":[{"meth":"email","val":user.email}]
    }
  }
}

const initLoginBasic = (user:  Pick<NewUserInfo, 'username'|'password'>) => {
  return {
    login:{
      id: getNextUniqueId(),
      scheme:"basic",
      secret: toBase64(`${user.username}:${user.password}`),
    }
  }
}

const sendWS = (ws: Websocket, pkt: any, id: string) => {
  let promise = makePromise(id);
  let msg = JSON.stringify(pkt);
  console.log("out: "+ msg);
  ws.send(msg, (error) => {
    if (error) {
      let errMsg = "Unknown Error"
      if (error instanceof Error) {
        errMsg = error.message
      }
      execPromise(id, Connection.NETWORK_ERROR, null, errMsg );
    }
  })
  return promise;
}

const attachOnMessage = (ws: Websocket) => {
  ws.on('message', (data: any) => {
    if (!data) return;
    console.log("in:"+ data)
    let pkt = JSON.parse(data)
    if (!pkt) {
      console.log("ERROR: failed to parse data")
    }
    if (pkt.ctrl) {
      if (pkt.ctrl.id) {
        execPromise(pkt.ctrl.id, pkt.ctrl.code, pkt.ctrl, pkt.ctrl.text);
      }
    }
  })
}

export {
  execPromise,
  makePromise,
  getNextUniqueId,
  initPacketHi,
  initPacketAcc,
  initLoginBasic,
  attachOnMessage,
  sendWS
}

