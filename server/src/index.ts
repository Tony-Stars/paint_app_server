import express, { Application, json } from 'express'
import expressWs, { Instance, WebsocketRequestHandler } from 'express-ws'
import cors from 'cors'
import dotenv from 'dotenv'

import { wsHandler } from './ws'
import { makeRouter } from './router'
import { DI } from './di'
import { insertAll } from './utils/sql-insert/insert'

dotenv.config()

const app: Application = express()
const WSServer: Instance = expressWs(app)
const aWss = WSServer.getWss()
const PORT = Number(process.env.PORT || 5000)

app.use(cors())
app.use(json())

const di = new DI();
di.init();

const router = makeRouter(di);
app.use(router);

const WRH: WebsocketRequestHandler = (ws, req) => wsHandler(aWss, ws, req);
WSServer.app.ws('/', WRH);

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))

// insertAll(di);
