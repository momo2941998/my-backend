import App from "./MyApp";


import { Controller } from "./types/my-module";
import { 
  userController, 
  uploadController,
  downloadController
} from "./routes"
import { http_port } from "./constants";


const controllers: Controller[] = [
  userController, 
  uploadController, 
  downloadController
]
const app = new App( controllers ,http_port)



app.listen()