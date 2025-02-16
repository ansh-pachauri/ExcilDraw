import React, { useEffect, useState, useRef } from 'react';
import { initDraw } from '@/app/draw';
import Canvas from './Canvas';

export  function MainCanvas({ roomId, socket }: { roomId: string; socket: WebSocket; })  {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        // const [socket, setSocket] =useState<WebSocket | null>(null);
        
    useEffect(()=>{
        if(canvasRef.current){
        //   initDraw(canvasRef.current, roomId.roomId,socket);
        
          initDraw(canvasRef.current, roomId, socket);
        }
    },[canvasRef])

    return   <canvas ref={canvasRef} width={2000} height={1000}></canvas>

}