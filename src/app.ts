import App from "./MyApp";


import { Controller } from "./types/my-module";
import { 
  userController, 
  uploadController,
  downloadController
} from "./routes"
import { http_port } from "./constants";
import { logger } from "./logger";


const controllers: Controller[] = [
  userController, 
  uploadController, 
  downloadController
]
const app = new App( controllers ,http_port)

function main () {
  app.start()
    .catch((err) => {
      logger.error(err)
      process.exit()
    })
}

main();