
import express from 'express';
import { logger, morganLogger } from './logger'
import { assignId, errorMiddleware } from './middleware'
import http from 'http'
import cors from 'cors'
class App {
  public app: express.Application;
  public http_port: number;
  private httpServer: http.Server;

  constructor(http_port: number) {
    this.app = express();
    this.http_port = http_port;
    this.httpServer = http.createServer(this.app)
    this.initializeMiddlewares();
    this.initializeErrorHandling();
  }
 
  private initializeMiddlewares() {
    this.app.use(cors())
    this.app.use(assignId)
    this.app.use(morganLogger.combinedLogMiddleware)
    this.app.use(morganLogger.devLogMiddleware)
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json())

  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }
 
  public listen() {
    this.httpServer.listen(this.http_port, () => {
      logger.info(`app running in process: ${process.pid}, at port ${this.http_port}`)
    });
  }
}
 
export default App;