import { Request, Response, NextFunction } from 'express';

function customLogger(req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        console.log(`${req.ip}: ${req.method} ${req.url} >> status ${res.statusCode}`)
    } else {
        res.on("finish", () => {
            console.log(`${req.ip}: ${req.method} ${req.url} >> status ${res.statusCode}`)
        })
    }
    next()
}

exports.customLogger = customLogger;