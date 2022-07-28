
import winston, { createLogger, format, transports } from 'winston'
import { Transports } from 'winston/lib/winston/transports';
import { isProductionMode } from '../constants';
const { combine, timestamp, label, printf, colorize, errors } = format;
const { File, Console } = transports

const myFormat = printf(({ level, message, label, timestamp, stack }) => {
  if (stack) {
    return `${timestamp} ${level}: [${label}] ${message} \n ${stack}`;
  }
  return `${timestamp} ${level}: [${label}] ${message}`;
});

let myTransports: winston.transport[] = [
  //
  // - Write all logs with level `error` and below to `error.log`
  // - Write all logs with level `info` and below to `combined.log`
  //
  new File({ filename: 'log/error.log', level: 'error' }),
  new File({ filename: 'log/combined.log', level: isProductionMode ? 'error': 'info' }),
  new Console({
      level: isProductionMode ? 'error': 'info',
      format: combine(
        errors({ stack: true }),
        colorize(),
        label({ label: 'app' }),
        timestamp(),
        myFormat,
      )
    })
]


const logger = createLogger({
  format: combine(
    errors({ stack: true }),
    label({ label: 'app' }),
    timestamp(),
    myFormat,
  ),
  defaultMeta: { service: 'user-service' },
  transports: myTransports
});
 





export default logger