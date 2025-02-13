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

async export function initDraw(canvas: HTMLCanvasElement, roomId: string) {
    const ctx = canvas.getContext('2d');

    let existingShapes: shapes[] = await getExistingShapes(roomId);
    if (!ctx) {
        return;
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

        existingShapes.push({
            type: "rect",
            x: startX,
            y: startY,
            height,
            width
        })
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
    const response   =  axios.get(`${BACKEND_URL}/chats/${roomId}`);
    const message = response.data.message;

    const shapes = message.map((x: message:string))=>{
        const messageData= JSON.parse(x.message);
        return messageData;
    }

    return shapes;
}