"use client";
import { initDraw } from "@/app/draw";
import { useEffect, useRef, useState } from "react";
import { WS_URL } from "../config";

export function Canvas({roomId}: {roomId:string}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [socket, setSocket] =useState<WebSocket>();

    useEffect(() => {
      const ws = new WebSocket(WS_URL);
    
     ws.onopen = ()=>{
        setSocket(ws);
     }
    }, [])
    

    useEffect(()=>{
        if(canvasRef.current){
        initDraw(canvasRef.current,roomId); 

        }
    },[canvasRef])

    if(!socket){
        return <div>Connecting to server...</div>;
    }
    return <div>
        <canvas ref={canvasRef} width={2000} height={1000}></canvas>
        <div className="absolute bottom-0 right-0 bg-black p-2 gap-2 flex rounded"> 
            <button className="bg-white text-black p-2">Reactangle</button>
            <button className="bg-white text-black p-2">Circle</button>

        </div>
    </div>
}