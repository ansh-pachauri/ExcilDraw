import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] =useState<WebSocket>();

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNDUyNDYyYi04YmFiLTQ4OTMtYmUzNy1jMWRlNDU4NDI0NDQiLCJpYXQiOjE3MzkzNjg4MDJ9.cgZI490A1tLA06YJU5Jc4rp5ID-dgIjsBzZ9KyJYqyc`);
        ws.onopen = ()=>{
            setLoading(false);
            setSocket(ws);
        }

    },[]);

    return {loading, socket};
}