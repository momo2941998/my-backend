import App from "./MyApp";
import dotenv from 'dotenv'

import { verifyToken } from "./utils/jwtUtils";
import { Controller } from "./types/my-module";
import { jwtController } from "./routes";
dotenv.config()
let http_port = parseInt(process.env.HTTP_PORT || "80000")

const controllers: Controller[] = [
  jwtController,
]
const app = new App( controllers ,http_port)



app.listen()