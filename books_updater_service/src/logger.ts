import { createLogger, format, transports } from "winston";

const fmt = format.printf(({ level, message, label, timestamp }) => {
    return `[${timestamp}] [${label}] [${level}] ${message}`;
});

let date = new Date();
let date_str = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');

export const logger = createLogger({
    format: format.combine(
        format.label({ label: "observer" }),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true })
    ),
    defaultMeta: { service: "observer" },
    transports: [
        new transports.Console({ 
            handleExceptions: true, 
            level: "debug", 
            format: format.combine(
                format.colorize(),
                fmt
            )
        }),
        new transports.File({ 
            filename: `./logs/log-${date_str}`, 
            level: "verbose",
            format: format.combine(fmt)
        })
    ]
});