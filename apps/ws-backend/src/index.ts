import {WebSocketServer, WebSocket} from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from '@repo/db/client';
const wss = new WebSocketServer({ port: 8080 });


interface User {
    ws: WebSocket,
    userId: string,
    rooms: string[]
}
function checkUser(token : string) : string | null {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if(typeof decoded === 'string'){
        return null;
    }

    if(!decoded || !(decoded as JwtPayload).userId){
        return null;
    }

    return decoded.userId;
}

const users: User[] = [];
wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if(!url){
        return ;
    }
    const queryParam  = new URLSearchParams(url.split("?")[1]);
    const token = queryParam.get("token") || "";
    const userId = checkUser(token) || '';

    if(!userId){
        ws.close();
    }
    
    users.push({
        ws,
        userId,
        rooms: []
    })
    ws.on('message',async function message(data){
        let parsedData;
        if(typeof data!== "string"){
            parsedData = JSON.parse(data.toString());
        }else{
            parsedData = JSON.parse(data);
        }

        //join room logic
        if (parsedData.type === "join_room") {
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedData.roomId);
          }

        //leaving room logic
        if(parsedData.type ==="leave_room"){
            const user = users.find(u=>u.ws === ws);
            if(!user){
                return;
            }
            user.rooms = user?.rooms.filter(r=>r ===parsedData.room);
        }

        
        console.log("message received")
        console.log(parsedData);

        if(parsedData.type ==="chat"){
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            
            
            await prismaClient.chat.create({
                data:{
                    roomId : Number(roomId),
                    message,
                    userId
                }
            });

            users.forEach(user =>{
                if(user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type:"chat",
                        message: message,
                        roomId}))
                }
            })
        }
    });
} );