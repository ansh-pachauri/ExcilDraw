import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from './middleware';
import {CreateUserSchema, SigninSchema, CreateRoomSchema} from '@repo/common/types';
import { prismaClient } from '@repo/db/client';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res)=>{

    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.status(400).json({message:"Invalid data"}); 
        return;
    }
    //db call
   
    

    try{
        const user = await prismaClient.user.create({
            data:{
                email: parsedData.data?.username,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id 
        })
    }catch(e){
        res.status(411).json({message:"User already exists"});
    }
})

app.post("/signin", async(req, res)=>{

    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.status(400).json({message:"Invalid data"}); 
        return;
    }
    
    try{
        const user = await prismaClient.user.findFirst({
            where:{
                email: parsedData.data.username,
                password: parsedData.data.password
            }
        })
        if(!user){
            res.status(401).json({message:"User is not authorized"});
            return;
        }
        const token = jwt.sign({userId:user?.id}, JWT_SECRET);

    res.json({token});
    }catch(e){
        res.status(401).json({message:"Invalid credentials"});
    }
    
})  

app.post("/room",middleware,async(req, res)=>{
    //db call

    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        res.status(400).json({message:"Invalid data"}); 
        return;
    }
    //@ts-ignore
    const userId = req.userId;


    try {
         //@ts-ignore
    const room = await prismaClient.room.create({
        data:{
            slug: parsedData.data.name,
            adminId: userId
        }
    })
    res.json({
        roomId : room.id
    });
    } catch (e) {
        res.status(411).json({message:"Room  already exists"});
    }
    
    
})

//get route
app.get("/chats/:roomId", async(req, res)=>{
    try{
        const roomId = Number(req.params.roomId);
       const messages = await prismaClient.chat.findMany({
        where:{
            roomId: roomId
        },
        orderBy:{
            id:"desc"
        },
        take: 50
    });

    res.json({
        messages
    })
    }catch(e){
        res.status(411).json({message:"Invalid room id"});
    }
    
})

//get route for the slug
app.get("/room/:slug", async(req, res)=>{
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where:{
            slug
        },
        
    });

    res.json({
        room
    })
})


app.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
});