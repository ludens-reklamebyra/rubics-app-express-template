import winston from 'winston';
import { LOG_LEVEL } from '../utils/constants.js';

export enum LogLevel {
  Error = 'error',
  Route = 'route',
  Warning = 'warn',
  Info = 'info',
  Debug = 'debug',
}

const customLevels = {
  levels: {
    error: 0,
    route: 1,
    warn: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    route: 'cyan',
    warn: 'yellow',
    info: 'green',
    debug: 'white',
  },
};

winston.addColors(customLevels.colors);
const logger = winston.createLogger({
  transports: [new winston.transports.Console({ level: LOG_LEVEL })],
  format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
  exitOnError: false,
  levels: customLevels.levels,
});

export default logger;
