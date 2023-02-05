const fs = require("fs")
const path = require("path")

const express = require("express")
const youtubedl = require("youtube-dl-exec")
const customLogger = require("./customlogger").customLogger
const app = express()
const port = 23232

import { Request, Response } from 'express';

interface Query {
    link: string;
}

app.use(customLogger)

app.use("/public", express.static(path.join(__dirname, "public")))
// -- format: mp3, wav, m4a
// -- url param ?link=<any ytdl compatible source>
app.get("/api/ytdl/audio/:format", (req: Request<any, any, any, Query>, res: Response) => {
    const { query } = req;
    const link = query.link
    const format = req.params.format
    const linkhash = hashCode(link)
    const filename = linkhash + "." + format

    res.setHeader("Content-Disposition", `attachment; filename=${filename}`)

    if (fs.existsSync("./savedfiles/" + filename)) {
        console.log(`${req.ip} serving pre-existing ${link} as ${format} (filename ${filename})`)
        return res.sendFile(`savedfiles/${filename}`, {
            root: "."
        })
    }

    console.log(`${req.ip} downloading ${link} as ${format} (filename ${filename})`)
    
    youtubedl(link, {
        noWarnings: true,
        preferFreeFormats: true,
        restrictFilenames: true,
        output: `savedfiles/${filename}`,
        extractAudio: true,
        audioFormat: format,
    }).then((output: any) => {
        res.contentType(`savedfiles/${filename}`)
        return res.sendFile(`savedfiles/${filename}`, {
            root: "."
        })
    }).catch((err: Error) => {
        return res.send(err).status(400)
    })
    
})

app.get("/pages/ytdlapi", (req: Request, res: Response) => {
    res.sendFile("pages/ytdl_api.html", {
        root: "./src"
    })
})

app.listen(port, () => {
    console.log("Listening on", port)
})

function hashCode(input: string) {
    var hash = 0,
      i, chr;
    if (input.length === 0) return hash;
    for (i = 0; i < input.length; i++) {
      chr = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
}