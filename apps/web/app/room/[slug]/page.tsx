import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { ChatRoom } from '../../../components/ChatRoom';

async function getRoomId(slug: string) {
    try {
        const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
        console.log('Response:', response.data); // Debug log to see the actual response
        
        if (!response.data || !response.data.room) {
            throw new Error('Invalid response structure');
        }
        
        return response.data.room.id;
    } catch (error) {
        console.error('Error fetching room:', error);
        throw error; // Re-throw to handle it in the component
    }
}

export default async function RoomPage({
    params
}:{
    params:{
        slug:string
    }
}) {
    const slug =(await params).slug;
    const roomId = await getRoomId(slug);


    return <ChatRoom id={roomId}></ChatRoom>
}