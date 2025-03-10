import winston from 'winston';

//////////// Formatos do log -> não usar já que precisa estar em JSON //////////////
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
 return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

////////// Configuração //////////////
const logger = winston.createLogger({
 level: 'info',
 format: winston.format.combine(
   winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
   winston.format.json() // ou logFormat ( ai nao retorna json)
 ),
 transports: [
   new winston.transports.Console(),
   new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), //// logs de erro ////
   new winston.transports.File({ filename: 'logs/info.log', level: 'info' }) //// logs de info, warn ////
 ],
});

//////// PARA PRODUCAO:  NÃO EXIBE LOGS NO CONSOLE! ////////////
if (process.env.NODE_ENV === 'production') {
 logger.remove(new winston.transports.Console());
}

export default logger;