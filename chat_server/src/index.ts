import express, { Application, json } from 'express'
import expressWs, { Instance, WebsocketRequestHandler } from 'express-ws'
import cors from 'cors'
import dotenv from 'dotenv'

import { wsHandler } from './ws'

dotenv.config()

const app: Application = express()
const WSServer: Instance = expressWs(app)
const aWss = WSServer.getWss()
const PORT = Number(process.env.PORT || 5001)

app.use(cors())
app.use(json())

const WRH: WebsocketRequestHandler = (ws, req) => wsHandler(aWss, ws, req);
WSServer.app.ws('/', WRH);

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
