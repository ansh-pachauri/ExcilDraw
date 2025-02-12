"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";


export default function Home() {

  const [roomId, setroomId]= useState("");
  const router = useRouter();
  return (
    <div style={{
      display:"flex",
       justifyContent:"center", 
       alignItems:"center",
       height:"100vh",
       width:"100vw"}}>
        <div style={{padding:10 }}>
        <input style={{padding:10}} value={roomId} onChange={(e)=>setroomId(e.target.value)}
       placeholder="Room Id"></input>

       <button style={{padding:10}} onClick={()=>{
        router.push(`/room/${roomId}`)
       }}
       >Join Room</button>
        </div>
      
    </div>
  );
}
