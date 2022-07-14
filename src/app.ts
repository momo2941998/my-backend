import App from "./MyApp";
import dotenv from 'dotenv'

import { Controller } from "./types/my-module";
import { userController } from "./routes"
dotenv.config()
let http_port = parseInt(process.env.HTTP_PORT || "80000")

const controllers: Controller[] = [userController]
const app = new App( controllers ,http_port)



app.listen()