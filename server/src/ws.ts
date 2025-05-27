import { Request } from 'express'

interface IWSS {
    clients: Set<any>;
}

export function wsHandler(wss: IWSS, ws: any, _: Request): void {
    ws.on('message', (msg: any) => {
        msg = JSON.parse(msg)
        // console.log(msg);
        switch (msg.method) {
            case "connect":
                connectionHandler(wss, ws, msg);
                break
            case "draw":
                broadcastConnection(wss, ws, msg);
                break
            case "clear":
                broadcastConnection(wss, ws, msg);
                break
        }
    })
};

export function connectionHandler(wss: IWSS, ws: any, msg: any): void {
    ws.sessionId = msg.sessionId;
    broadcastConnection(wss, ws, msg);
};

export function broadcastConnection(wss: IWSS, ws: any, msg: any): void {
    wss.clients.forEach((client: any) => {
        if (client.sessionId !== msg.sessionId) {
            console.log(msg);
            client.send(JSON.stringify(msg))
        }
    })
};
