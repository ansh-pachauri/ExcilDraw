import { BACKEND_URL } from "../app/config";
import axios from 'axios';
import { ChatRoomClient } from "./ChatRoomClient";
async function getChats(roomId: string) {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return response.data.message;
}



export async function ChatRoom({id}: {
    id:string
}) {
    const message = await getChats(id);
    return <ChatRoomClient message={message} id={id}></ChatRoomClient>
}