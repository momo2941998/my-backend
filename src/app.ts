import App from "./MyApp";
import dotenv from 'dotenv'

import { Controller } from "./types/my-module";
import { 
  userController, 
  uploadController,
  downloadController
} from "./routes"
dotenv.config()
let http_port = parseInt(process.env.HTTP_PORT || "80000")

const controllers: Controller[] = [
  userController, 
  uploadController, 
  downloadController
]
const app = new App( controllers ,http_port)



app.listen()