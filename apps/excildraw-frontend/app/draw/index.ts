import axios from 'axios';
import { BACKEND_URL } from '@/config';

type shapes = {
    type: "rect",
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
}

 export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket:WebSocket) {
    const ctx = canvas.getContext('2d');

    let existingShapes: shapes[] = await getExistingShapes(roomId);
    if (!ctx) {
        return;
    }

    socket.onmessage =  (event) => {
        const message = JSON.parse(event.data);
        if(message.type ==="chat"){
            existingShapes.push(message.data);
            cleaerCanvas(existingShapes, canvas, ctx);
        }
    }

    cleaerCanvas(existingShapes, canvas, ctx);

    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener('mousedown', (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    })

    canvas.addEventListener('mouseup', (e) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        const shape: shapes  ={
            type: "rect",
            x: startX,
            y: startY,
            height,
            width
        }
        existingShapes.push(shape);
        
        //send it to backend
        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify(shape)
        }))
    })

    canvas.addEventListener('mousemove', (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;

            cleaerCanvas(existingShapes, canvas, ctx);
            ctx.strokeStyle = "white";
            ctx.strokeRect(startX, startY, width, height);
        }

    })
}


function cleaerCanvas(existingShapes: shapes[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    existingShapes.forEach((shape) => {
        ctx.strokeStyle = "white";

        if (shape.type === "rect") {
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }else if(shape.type === "circle"){
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
    })
}


async function getExistingShapes(roomId: string) {
    try {
        const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
        console.log("response:", response);
        
        if (!response.data || !response.data.message) {
            console.log("No messages found, returning empty array");
            return [];
        }
        
        const message = response.data.message;
        console.log("messages:", message);
        
        const shapes = Array.isArray(message) ? message.map((x: {message: string}) => {
            try {
                return JSON.parse(x.message);
            } catch (error) {
                console.error('Failed to parse message:', error);
                return null;
            }
        }).filter(shape => shape !== null) : [];
        
        return shapes;
    } catch (error) {
        console.error("Error fetching shapes:", error);
        return []; // Return empty array if request fails
    }
}