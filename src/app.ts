import App from "./MyApp";
import dotenv from 'dotenv'
dotenv.config()
let http_port = parseInt(process.env.HTTP_PORT || "80000")

const app = new App(http_port)
app.listen()