import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from './middleware';
import {CreateUserSchema, SigninSchema, CreateRoomSchema} from '@repo/common/types';
import { prismaClient } from '@repo/db/client';

const app = express();
app.use(express.json());

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

app.post("/signin", (req, res)=>{

    const data = SigninSchema.safeParse(req.body);
    if(!data.success){
        res.status(400).json({message:"Invalid data"}); 
    }
    
    const userId =1;
    const token = jwt.sign({userId}, JWT_SECRET);

    res.json({token});
})

app.post("/room",middleware,  (req, res)=>{
    //db call

    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
        res.status(400).json({message:"Invalid data"}); 
    }
    res.json({
        roomId : 123
    });
    
})


app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});