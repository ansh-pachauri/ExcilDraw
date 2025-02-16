"use client";
// import { initDraw } from "@/app/draw";
import { useEffect, useRef, useState } from "react";
import { WS_URL } from "../config";
import { MainCanvas } from "./MainCanvas";

export default function Canvas({roomId}: {roomId:string}){
    // const canvasRef = useRef<HTMLCanvasElement>(null);
    const [socket, setSocket] =useState<WebSocket | null>(null);

    useEffect(() => {
      const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNDUyNDYyYi04YmFiLTQ4OTMtYmUzNy1jMWRlNDU4NDI0NDQiLCJpYXQiOjE3MzkzNjg4MDJ9.cgZI490A1tLA06YJU5Jc4rp5ID-dgIjsBzZ9KyJYqyc`);
    
     ws.onopen = ()=>{
        setSocket(ws);
     }
    }, [])
    

   
    if(!socket){
        return <div className="text-white">Connecting to server...</div>;
    }
    return <div>
        <MainCanvas roomId={roomId} socket={socket}/>
        <div className="absolute bottom-0 right-0 bg-black p-2 gap-2 flex rounded"> 
            <button className="bg-white text-black p-2">Reactangle</button>
            <button className="bg-white text-black p-2">Circle</button>

        </div>
    </div>
}